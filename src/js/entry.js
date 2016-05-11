import THREE from 'three';

const rand = function(range) {
  return Math.random() * range - range / 2;
};

class ThreeBackGround {
  constructor() {
    this._render = this._render.bind(this);
    window.addEventListener('mousemove', this._handleMousemove.bind(this));
    this.timer = 0;
    return this.initThree().addObjects();
  }

  initThree() {
    this.dom = document.querySelector('.three');
    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog(0x3399ff, 0, 50);
    this.camera = new THREE.PerspectiveCamera(75, this.dom.clientWidth / this.dom.clientHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 30);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.dom, alpha: true, antialias: true });

    this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
    this.renderer.setClearColor(0x0188c0);
    return this;
  }

  addObjects() {
    const RANGE = 100;
    for(let i = 0; i < 1000; i++) {
      const geometry = new THREE.Geometry();
      geometry.vertices[0] = new THREE.Vector3(3,0,0);
      geometry.vertices[1] = new THREE.Vector3(0,3,0);
      geometry.vertices[2] = new THREE.Vector3(0,0,3);
      geometry.faces[0] = new THREE.Face3(0,1,2);

      const color = new THREE.Color(0x0188c0);
      color.offsetHSL(0, 0, Math.random() / 5);
      const material =  new THREE.MeshBasicMaterial({ color, wireframe: Math.random() > 0.8 });
      const triangle =  new THREE.Mesh(geometry, material);

      triangle.position.set(rand(RANGE), rand(RANGE), rand(RANGE));
      triangle.rotation.set(rand(Math.PI*2), rand(Math.PI*2), rand(Math.PI*2));

      this.scene.add(triangle);
    }
    for(let i = 0; i < 100; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      const color = new THREE.Color(0x0188c0);
      color.offsetHSL(0, 0, Math.random() / 5);
      const material =  new THREE.MeshBasicMaterial({ color, blending: THREE.AdditiveBlending, wireframe: Math.random() > 0.8 });
      const box =  new THREE.Mesh(geometry, material);

      box.position.set(rand(RANGE), rand(RANGE), rand(RANGE));
      box.rotation.set(rand(Math.PI*2), rand(Math.PI*2), rand(Math.PI*2));

      this.scene.add(box);
    }
    console.log(this.scene);
    return this;
  }

  _render() {
    const recttop = document.querySelector('.cont.bg02').getBoundingClientRect().top;
    const newPosition = new THREE.Vector3(0, 0, 30).applyAxisAngle(new THREE.Vector3(0, 1, 0), (this.mouseX - window.innerWidth / 2) / 1000);
    newPosition.applyAxisAngle(new THREE.Vector3(1, 0, 0), (this.mouseY - window.innerHeight / 2) / 1000);
    this.camera.position.set(newPosition.x, newPosition.y - ((window.scrollY - recttop) - window.innerHeight / 2) / 100, newPosition.z);
    // this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this._render);

    this.scene.children.forEach((child) => {
      child.rotation.x += 0.01;
    });
    this.timer++;
  }

  _handleMousemove(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  start() {
    this._render();
    return this;
  }
}

const three = new ThreeBackGround();

three.start();