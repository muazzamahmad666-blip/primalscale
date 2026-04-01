"use client";
import { useEffect, useRef } from "react";

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      DENSITY_DISSIPATION: 1,
      VELOCITY_DISSIPATION: 0.2,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      SHADING: true,
      TRANSPARENT: true,
    };

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
      const isWebGL2 = !!gl;
      if (!isWebGL2) {
        gl = (canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)) as WebGL2RenderingContext | null;
      }
      if (!gl) return null;

      let halfFloat: OES_texture_half_float | null = null;
      let supportLinearFiltering: OES_texture_half_float_linear | OES_texture_float_linear | null = null;

      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = (gl as unknown as WebGLRenderingContext).getExtension("OES_texture_half_float");
        supportLinearFiltering = (gl as unknown as WebGLRenderingContext).getExtension("OES_texture_half_float_linear");
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      const halfFloatTexType = isWebGL2
        ? (gl as unknown as { HALF_FLOAT: number }).HALF_FLOAT
        : (halfFloat && (halfFloat as OES_texture_half_float).HALF_FLOAT_OES) || gl.FLOAT;

      return { gl, ext: { halfFloatTexType, supportLinearFiltering } };
    }

    const ctx = getWebGLContext(canvas);
    if (!ctx) return;
    const { gl } = ctx;

    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    function createProgram(vertSrc: string, fragSrc: string) {
      const program = gl.createProgram()!;
      gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertSrc));
      gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragSrc));
      gl.linkProgram(program);
      return program;
    }

    const baseVert = `precision highp float; attribute vec2 aPosition; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform vec2 texelSize; void main(){ vUv = aPosition * 0.5 + 0.5; vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0); vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y); gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const clearFrag = `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main(){ gl_FragColor = value * texture2D(uTexture, vUv); }`;
    const splatFrag = `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main(){ vec2 p = vUv - point.xy; p.x *= aspectRatio; float splat = exp(-dot(p,p) / radius); vec3 base = texture2D(uTarget, vUv).xyz; gl_FragColor = vec4(base + splat * color, 1.0); }`;
    const advectionFrag = `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation; vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize){ vec2 st = uv / tsize - 0.5; vec2 iuv = floor(st); vec2 fuv = fract(st); vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize); vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize); vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize); vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize); return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y); } void main(){ vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize; gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize); gl_FragColor.a = 1.0; }`;
    const divergenceFrag = `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main(){ float L = texture2D(uVelocity, vL).x; float R = texture2D(uVelocity, vR).x; float T = texture2D(uVelocity, vT).y; float B = texture2D(uVelocity, vB).y; vec2 C = texture2D(uVelocity, vUv).xy; if(vL.x < 0.0){ C.x = 0.0; L = -C.x; } if(vR.x > 1.0){ C.x = 0.0; R = -C.x; } if(vT.y > 1.0){ C.y = 0.0; T = -C.y; } if(vB.y < 0.0){ C.y = 0.0; B = -C.y; } float div = 0.5 * (R - L + T - B); gl_FragColor = vec4(div, 0.0, 0.0, 1.0); }`;
    const curlFrag = `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main(){ float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y; float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x; float vorticity = R - L - T + B; gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0); }`;
    const vorticityFrag = `precision highp float; precision highp sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt; void main(){ float L = texture2D(uCurl, vL).x; float R = texture2D(uCurl, vR).x; float T = texture2D(uCurl, vT).x; float B = texture2D(uCurl, vB).x; float C = texture2D(uCurl, vUv).x; vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L)); force /= length(force) + 0.0001; force *= curl * C; force.y *= -1.0; vec2 velocity = texture2D(uVelocity, vUv).xy; velocity += force * dt; velocity = min(max(velocity, -1000.0), 1000.0); gl_FragColor = vec4(velocity, 0.0, 1.0); }`;
    const pressureFrag = `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; void main(){ float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x; float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x; float C = texture2D(uPressure, vUv).x; float divergence = texture2D(uDivergence, vUv).x; float pressure = (L + R + B + T - divergence) * 0.25; gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0); }`;
    const gradientSubtractFrag = `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; void main(){ float L = texture2D(uPressure, vL).x; float R = texture2D(uPressure, vR).x; float T = texture2D(uPressure, vT).x; float B = texture2D(uPressure, vB).x; vec2 velocity = texture2D(uVelocity, vUv).xy; velocity.xy -= vec2(R - L, T - B); gl_FragColor = vec4(velocity, 0.0, 1.0); }`;
    const displayFrag = `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTexture; void main(){ vec3 C = texture2D(uTexture, vUv).rgb; float a = max(C.r, max(C.g, C.b)); gl_FragColor = vec4(C, a); }`;

    function makeProgram(vertSrc: string, fragSrc: string) {
      const prog = createProgram(vertSrc, fragSrc);
      const uniforms: Record<string, WebGLUniformLocation> = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(prog, i)!;
        uniforms[info.name] = gl.getUniformLocation(prog, info.name)!;
      }
      return { program: prog, uniforms };
    }

    const splatProgram = makeProgram(baseVert, splatFrag);
    const advectionProgram = makeProgram(baseVert, advectionFrag);
    const divergenceProgram = makeProgram(baseVert, divergenceFrag);
    const curlProgram = makeProgram(baseVert, curlFrag);
    const vorticityProgram = makeProgram(baseVert, vorticityFrag);
    const pressureProgram = makeProgram(baseVert, pressureFrag);
    const gradientSubtractProgram = makeProgram(baseVert, gradientSubtractFrag);
    const clearProgram = makeProgram(baseVert, clearFrag);
    const displayProgram = makeProgram(baseVert, displayFrag);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(splatProgram.program, "aPosition");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
      gl.activeTexture(gl.TEXTURE0);
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const texelSizeX = 1 / w;
      const texelSizeY = 1 / h;
      let attachId = 0;
      return {
        texture: tex,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, tex); attachId = id; return id; },
        get attachId() { return attachId; }
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, filter);
      let fbo2 = createFBO(w, h, internalFormat, format, type, filter);
      return {
        width: w, height: h,
        texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
        get read() { return fbo1; },
        set read(v) { fbo1 = v; },
        get write() { return fbo2; },
        set write(v) { fbo2 = v; },
        swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; }
      };
    }

    function blit(target: ReturnType<typeof createFBO> | null) {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.width, target.height);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    const texType = (ctx as { ext: { halfFloatTexType: number } }).ext.halfFloatTexType;
    const rgba = { internalFormat: gl.RGBA, format: gl.RGBA };
    const rg = { internalFormat: gl.RGBA, format: gl.RGBA };
    const r = { internalFormat: gl.RGBA, format: gl.RGBA };
    const filter = gl.LINEAR;

    const simW = config.SIM_RESOLUTION;
    const simH = config.SIM_RESOLUTION;
    const dyeW = config.DYE_RESOLUTION;
    const dyeH = config.DYE_RESOLUTION;

    let velocity = createDoubleFBO(simW, simH, rg.internalFormat, rg.format, texType, filter);
    let dye = createDoubleFBO(dyeW, dyeH, rgba.internalFormat, rgba.format, texType, filter);
    const divergence = createFBO(simW, simH, r.internalFormat, r.format, texType, gl.NEAREST);
    const curl = createFBO(simW, simH, r.internalFormat, r.format, texType, gl.NEAREST);
    let pressure = createDoubleFBO(simW, simH, r.internalFormat, r.format, texType, gl.NEAREST);

    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      gl.useProgram(splatProgram.program);
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / canvas!.height);
      gl.uniform2f(splatProgram.uniforms.point, x / canvas!.width, 1.0 - y / canvas!.height);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      blit(velocity.write);
      velocity.swap();
      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    let lastTime = Date.now();
    let animId: number;

    function update() {
      const now = Date.now();
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 0.016667);
      lastTime = now;

      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;

      // Curl
      gl.useProgram(curlProgram.program);
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      // Vorticity
      gl.useProgram(vorticityProgram.program);
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // Divergence
      gl.useProgram(divergenceProgram.program);
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // Clear pressure
      gl.useProgram(clearProgram.program);
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      // Pressure solve
      gl.useProgram(pressureProgram.program);
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // Gradient subtract
      gl.useProgram(gradientSubtractProgram.program);
      gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // Advect velocity
      gl.useProgram(advectionProgram.program);
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // Advect dye
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();

      // Display
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(displayProgram.program);
      gl.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0));
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      animId = requestAnimationFrame(update);
    }

    splat(window.innerWidth / 2, window.innerHeight / 2, 0, -20, { r: 0.5, g: 0.1, b: 0.7 });

    const handleMouseMove = (e: MouseEvent) => splat(e.clientX, e.clientY, e.movementX * 10, -e.movementY * 10, { r: 0.7, g: 0.1, b: 0.9 });
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      splat(t.clientX, t.clientY, 10, 10, { r: 0.7, g: 0.1, b: 0.9 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 opacity-30 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
