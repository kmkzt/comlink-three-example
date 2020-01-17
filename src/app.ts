// https://github.com/mrdoob/three.js/blob/0f44080d7927b9949b9c67128f1efc9ea1239bd1/examples/js/offscreen/scene.js
import {
  PerspectiveCamera,
  Scene,
  Group,
  WebGLRenderer,
  Fog,
  Color,
  Mesh,
  MeshMatcapMaterial,
  IcosahedronBufferGeometry
} from 'three'

// PRNG

var seed = 1

function random() {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export default class App {
  private static camera: PerspectiveCamera
  private static scene: Scene
  private static renderer: WebGLRenderer
  private static group: Group
  constructor({
    canvas,
    width,
    height,
    pixelRatio
  }: {
    canvas: HTMLCanvasElement
    width: number
    height: number
    pixelRatio: number
  }) {
    App.bind(this)
    App.camera = new PerspectiveCamera(40, width / height, 1, 1000)
    App.scene = new Scene()
    App.renderer = new WebGLRenderer({ antialias: true, canvas: canvas })
    App.renderer.setPixelRatio(pixelRatio)
    App.renderer.setSize(width, height, false)

    App.group = new Group()
  }
  public init() {
    App.camera.position.z = 200
    App.scene.fog = new Fog(0x444466, 100, 400)
    App.scene.background = new Color(0x444466)

    App.scene.add(App.group)

    // we don't use ImageLoader since it has a DOM dependency (HTML5 image element)

    // var loader = new THREE.ImageBitmapLoader().setPath( path );
    // loader.setOptions( { imageOrientation: 'flipY' } );
    // loader.load( 'textures/matcaps/matcap-porcelain-white.jpg', function ( imageBitmap ) {

    // 	var texture = new THREE.CanvasTexture( imageBitmap );

    // 	var geometry = new THREE.IcosahedronBufferGeometry( 5, 3 );
    // 	var materials = [
    // 		new THREE.MeshMatcapMaterial( { color: 0xaa24df, matcap: texture } ),
    // 		new THREE.MeshMatcapMaterial( { color: 0x605d90, matcap: texture } ),
    // 		new THREE.MeshMatcapMaterial( { color: 0xe04a3f, matcap: texture } ),
    // 		new THREE.MeshMatcapMaterial( { color: 0xe30456, matcap: texture } )
    // 	];

    // 	for ( var i = 0; i < 100; i ++ ) {

    // 		var material = materials[ i % materials.length ];
    // 		var mesh = new THREE.Mesh( geometry, material );
    // 		mesh.position.x = random() * 200 - 100;
    // 		mesh.position.y = random() * 200 - 100;
    // 		mesh.position.z = random() * 200 - 100;
    // 		mesh.scale.setScalar( random() + 1 );
    // 		group.add( mesh );
    // 	}
    // } );
    const geometry = new IcosahedronBufferGeometry(5, 3)
    const materials = [
      new MeshMatcapMaterial({ color: 0xaa24df }),
      new MeshMatcapMaterial({ color: 0x605d90 }),
      new MeshMatcapMaterial({ color: 0xe04a3f }),
      new MeshMatcapMaterial({ color: 0xe30456 })
    ]

    for (var i = 0; i < 100; i++) {
      const material = materials[i % materials.length]
      const mesh = new Mesh(geometry, material)
      mesh.position.x = random() * 200 - 100
      mesh.position.y = random() * 200 - 100
      mesh.position.z = random() * 200 - 100
      mesh.scale.setScalar(random() + 1)
      App.group.add(mesh)
    }
    App.animate()
  }

  public static animate() {
    // group.rotation.x = Date.now() / 4000;
    App.group.rotation.y = -Date.now() / 4000
    App.renderer.render(App.scene, App.camera)
    if (self.requestAnimationFrame) {
      self.requestAnimationFrame(App.animate)
    } else {
      // Firefox
    }
  }
}
