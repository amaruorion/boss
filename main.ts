namespace SpriteKind {
    export const enemyProjectile = SpriteKind.create()
    export const PlayerProjectiole = SpriteKind.create()
    export const PlayerProjectile = SpriteKind.create()
    export const ExplodingProjectile = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    move(ThePlayer)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . 5 5 . . . 
        . . 5 4 4 5 . . 
        . 5 4 5 5 4 5 . 
        5 4 5 4 4 5 4 5 
        5 4 5 4 4 5 4 5 
        . 5 4 5 5 4 5 . 
        . . 5 4 4 5 . . 
        . . . 5 5 . . . 
        `, ThePlayer, 0, -100)
    projectile.setKind(SpriteKind.PlayerProjectile)
    animation.runImageAnimation(
    projectile,
    [img`
        . . . 5 5 . . . 
        . . 5 4 4 5 . . 
        . 5 4 5 5 4 5 . 
        5 4 5 4 4 5 4 5 
        5 4 5 4 4 5 4 5 
        . 5 4 5 5 4 5 . 
        . . 5 4 4 5 . . 
        . . . 5 5 . . . 
        `,img`
        . . . 4 4 . . . 
        . . 4 5 5 4 . . 
        . 4 5 4 4 5 4 . 
        4 5 4 5 5 4 5 4 
        4 5 4 5 5 4 5 4 
        . 4 5 4 4 5 4 . 
        . . 4 5 5 4 . . 
        . . . 4 4 . . . 
        `],
    100,
    true
    )
})
info.onCountdownEnd(function () {
    game.splash("" + (75 - timesHit) + " " + "Enemy Health Left")
    game.over(true, effects.confetti)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    game.splash("" + (75 - timesHit) + " " + "Enemy Health Left")
    game.over(true, effects.confetti)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExplodingProjectile, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    for (let index = 0; index < 8; index++) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . 5 5 . . . 
            . . 5 4 4 5 . . 
            . 5 4 5 5 4 5 . 
            5 4 5 4 4 5 4 5 
            5 4 5 4 4 5 4 5 
            . 5 4 5 5 4 5 . 
            . . 5 4 4 5 . . 
            . . . 5 5 . . . 
            `, ThePlayer, 0, -100)
        projectile.setKind(SpriteKind.PlayerProjectile)
    }
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
function flyToCenter () {
    Skelly.setVelocity(75, 30)
    pause(1000)
    Skelly.setVelocity(0, 0)
}
sprites.onOverlap(SpriteKind.PlayerProjectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    statusbar.value += -1
    timesHit += 1
    move(Skelly)
})
info.onLifeZero(function () {
    game.splash("" + (75 - timesHit) + " " + "Enemy Health Left")
    game.over(false)
})
sprites.onOverlap(SpriteKind.PlayerProjectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    otherSprite.destroy(effects.spray, 500)
})
function enemyShoot (projectileImage: Image) {
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, 50, 0)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, 50, 50)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, 0, 50)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, -50, 50)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, -50, 0)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, -50, -50)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, 0, -50)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
    ProjectileEnemy = sprites.createProjectileFromSprite(projectileImage, Skelly, 50, -50)
    animation.runImageAnimation(
    ProjectileEnemy,
    [img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `,img`
        . . . 8 8 . . . 
        . . 8 9 9 8 . . 
        . 8 9 8 8 9 8 . 
        8 9 8 9 9 8 9 8 
        8 9 8 9 9 8 9 8 
        . 8 9 8 8 9 8 . 
        . . 8 9 9 8 . . 
        . . . 8 8 . . . 
        `],
    100,
    true
    )
}
function move (Boss: Sprite) {
    Boss.setPosition(randint(20, 140), Boss.y)
}
let ProjectileEnemy: Sprite = null
let projectile: Sprite = null
let timesHit = 0
let statusbar: StatusBarSprite = null
let ThePlayer: Sprite = null
let Skelly: Sprite = null
tiles.setTilemap(tiles.createTilemap(hex`0a0008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    `, [myTiles.transparency16], TileScale.Sixteen))
Skelly = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f 1 1 1 1 f f . . . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . f d 1 1 1 1 1 1 1 1 d f . . 
    . . f d 1 1 1 1 1 1 1 1 d f . . 
    . . f d d d 1 1 1 1 d d d f . . 
    . . f b d b f d d f b d b f . . 
    . . f c d c f 1 1 f c d c f . . 
    . . . f b 1 1 1 1 1 1 b f . . . 
    . . f f f c d b 1 b d f f f f . 
    f c 1 1 1 c b f b f c 1 1 1 c f 
    f 1 b 1 b 1 f f f f 1 b 1 b 1 f 
    f b f b f f f f f f b f b f b f 
    . . . . . f f f f f f . . . . . 
    . . . . . . . f f f . . . . . . 
    `, SpriteKind.Enemy)
ThePlayer = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . f f f f f 2 2 f f f f f . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e 2 f 2 f f 2 f 2 e f . . 
    . . f f f 2 2 e e 2 2 f f f . . 
    . f f e f 2 f e e f 2 f e f f . 
    . f e e f f e e e e f e e e f . 
    . . f e e e e e e e e e e f . . 
    . . . f e e e e e e e e f . . . 
    . . e 4 f f f f f f f f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
let projectileImage = img`
    . . . 9 9 . . . 
    . . 9 8 8 9 . . 
    . 9 8 9 9 8 9 . 
    9 8 9 8 8 9 8 9 
    9 8 9 8 8 9 8 9 
    . 9 8 9 9 8 9 . 
    . . 9 8 8 9 . . 
    . . . 9 9 . . . 
    `
statusbar = statusbars.create(75, 10, StatusBarKind.EnemyHealth)
timesHit = 0
statusbar.setLabel("Boss HP")
statusbar.setBarBorder(3, 13)
statusbar.setPosition(75, 5)
controller.moveSprite(ThePlayer, 100, 100)
tiles.placeOnTile(Skelly, tiles.getTileLocation(0, 0))
tiles.placeOnTile(ThePlayer, tiles.getTileLocation(5, 6))
flyToCenter()
Skelly.setFlag(SpriteFlag.StayInScreen, true)
ThePlayer.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(20)
info.startCountdown(30)
game.onUpdate(function () {
    Skelly.setImage(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . . f 1 1 1 1 1 1 1 1 f . . . 
        . . f d 1 1 1 1 1 1 1 1 d f . . 
        . . f d 1 1 1 1 1 1 1 1 d f . . 
        . . f d d d 1 1 1 1 d d d f . . 
        . . f b d b f d d f b d b f . . 
        . . f c d c f 1 1 f c d c f . . 
        . . . f b 1 1 1 1 1 1 b f . . . 
        . . f f f c d b 1 b d f f f f . 
        f c 1 1 1 c b f b f c 1 1 1 c f 
        f 1 b 1 b 1 f f f f 1 b 1 b 1 f 
        f b f b f f f f f f b f b f b f 
        . . . . . f f f f f f . . . . . 
        . . . . . . . f f f . . . . . . 
        `)
})
game.onUpdateInterval(500, function () {
    enemyShoot(img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `)
})
game.onUpdateInterval(3000, function () {
    enemyShoot(img`
        . . . 9 9 . . . 
        . . 9 8 8 9 . . 
        . 9 8 9 9 8 9 . 
        9 8 9 8 8 9 8 9 
        9 8 9 8 8 9 8 9 
        . 9 8 9 9 8 9 . 
        . . 9 8 8 9 . . 
        . . . 9 9 . . . 
        `)
    move(Skelly)
})
