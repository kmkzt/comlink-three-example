import { Mesh, MeshBasicMaterial, BoxBufferGeometry } from 'three'

const colorMaterial = [0x00ff00, 0xff0000, 0xff0000, 0x00ffff]

const getColor = () =>
  colorMaterial[Math.floor(Math.random() * colorMaterial.length)]
export default class Example extends Mesh {
  private rotateAnimationX: number = 0.01
  private rotateAnimationY: number = 0.01
  private rotateAnimationZ: number = 0.01
  constructor() {
    super(
      new BoxBufferGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: getColor() })
    )
    this.animate = this.animate.bind(this)
    this.changeRotateRandom = this.changeRotateRandom.bind(this)
  }

  public changeRotateRandom() {
    this.rotateAnimationX = (Math.random() - 0.5) * 2
    this.rotateAnimationY = (Math.random() - 0.5) * 2
    this.rotateAnimationZ = (Math.random() - 0.5) * 2
    this.material = new MeshBasicMaterial({ color: getColor() })
  }
  public animate() {
    this.rotation.x += this.rotateAnimationX
    this.rotation.y += this.rotateAnimationY
    this.rotation.z += this.rotateAnimationZ
  }
}
