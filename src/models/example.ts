import { Mesh, MeshBasicMaterial, BoxBufferGeometry } from 'three'
export default class Example extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x00ff00 })
    )
    this.animate = this.animate.bind(this)
  }
  public animate() {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}
