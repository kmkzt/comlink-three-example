import { Scene, BoxBufferGeometry, Mesh, MeshLambertMaterial } from 'three'

export const genParticle = (scene: Scene) => {
  const geometry = new BoxBufferGeometry(20, 20, 20)

  for (let i = 0; i < 4000; i++) {
    const object = new Mesh(
      geometry,
      new MeshLambertMaterial({ color: Math.random() * 0xffffff })
    )

    object.position.x = Math.random() * 800 - 400
    object.position.y = Math.random() * 800 - 400
    object.position.z = Math.random() * 800 - 400

    object.rotation.x = Math.random() * 2 * Math.PI
    object.rotation.y = Math.random() * 2 * Math.PI
    object.rotation.z = Math.random() * 2 * Math.PI

    object.scale.x = Math.random() + 0.5
    object.scale.y = Math.random() + 0.5
    object.scale.z = Math.random() + 0.5

    scene.add(object)
  }
}
