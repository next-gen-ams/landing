import React, { useEffect, useState } from "react";
import * as THREE from "three";

const def = `
    uniform vec3      iResolution;           // viewport resolution (in pixels)
    uniform float     iTime;                 // shader playback time (in seconds)
    uniform sampler2D iChannel0;             // input channel

    vec2 kaleido(vec2 uv) {
        float th = atan(uv.y, uv.x);
        float r = pow(length(uv), 0.9);
        float f = 3.14159 / 3.5;
        th = abs(mod(th + f / 4.0, f) - f / 2.0) / (1.0 + r);
        // th = sin(th * 6.283 / f);
        return vec2(cos(th), sin(th)) * r * 0.1;
    }

    vec2 transform(vec2 at) {
        vec2 v;
        float th = 0.00002 * iTime;
        v.x = at.x * cos(th) - at.y * sin(th) - 0.2 * sin(th);
        v.y = at.x * sin(th) + at.y * cos(th) + 0.2 * cos(th);
        return v;
    }

    vec2 offset(vec2 at) {
        vec2 v;
        v.x = at.x + 0.3;
        v.y = at.y;
        return v;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = fragCoord.xy / iResolution.xy;
        uv.x = mix(-1.0, 1.0, uv.x);
        uv.y = mix(-1.0, 1.0, uv.y);
        uv.y *= iResolution.y / iResolution.x;
        fragColor = texture(iChannel0, offset(transform(kaleido(uv)) * 8.0));
    }
    void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

export function Kaleidoscope() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas,
      alpha: false,
    });
    renderer.autoClearColor = false;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/gradient-4.jpg");
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(1, 1, 1) },
      iChannel0: { value: texture },
    };
    const plane = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      fragmentShader: def,
      uniforms,
    });
    scene.add(new THREE.Mesh(plane, material));

    function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render(t: DOMHighResTimeStamp) {
      resizeRendererToDisplaySize(renderer);
      renderer.render(scene, camera);
      const canvas = renderer.domElement;
      uniforms.iResolution.value.set(
        canvas.clientWidth,
        canvas.clientHeight,
        1,
      );
      uniforms.iTime.value = t;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, [canvas]);
  return <canvas ref={setCanvas} className="w-screen h-screen" />;
}
