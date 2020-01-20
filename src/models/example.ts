import {
  PerspectiveCamera,
  Scene,
  Group,
  WebGLRenderer,
  Fog,
  Color,
  Mesh,
  MeshMatcapMaterial,
  IcosahedronBufferGeometry,
  BoxGeometry,
  MeshBasicMaterial
} from 'three'

var seed = 1

function random() {
  var x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export default class Example extends Group {
  constructor() {
    super()
    this.init = this.init.bind(this)
    this.animate = this.animate.bind(this)

    this.init()
  }
  public init() {
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
      this.add(mesh)
    }
  }
  public animate() {
    this.rotation.y = -Date.now() / 4000
  }
}
