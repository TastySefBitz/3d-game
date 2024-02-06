namespace SpriteKind {
    export const HUD = SpriteKind.create()
}
namespace StatusBarKind {
    export const Bullets = StatusBarKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Render.getRenderSpriteInstance().vy == 0) {
        Render.jumpWithHeightAndDuration(Render.getRenderSpriteInstance(), 14, 500)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 0) {
        statusbar.value += -1
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . 1 1 2 2 2 2 2 2 2 2 1 1 . . 
            . . 1 1 1 2 2 2 2 2 2 1 1 1 . . 
            . . 2 1 1 1 2 2 2 2 1 1 1 2 . . 
            . 2 2 2 1 1 1 2 2 1 1 1 2 2 2 . 
            . 2 2 2 2 1 1 1 1 1 1 2 2 2 2 . 
            . 2 2 2 2 2 1 1 1 1 2 2 2 2 2 . 
            . 2 2 2 2 2 1 1 1 1 2 2 2 2 2 . 
            . 2 2 2 2 1 1 1 1 1 1 2 2 2 2 . 
            . 2 2 2 1 1 1 2 2 1 1 1 2 2 2 . 
            . . 2 1 1 1 2 2 2 2 1 1 1 2 . . 
            . . 1 1 1 2 2 2 2 2 2 1 1 1 . . 
            . . 1 1 2 2 2 2 2 2 2 2 1 1 . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Render.getRenderSpriteInstance(), Render.getAttribute(Render.attribute.dirX) * 88, Render.getAttribute(Render.attribute.dirY) * 88)
        projectile.scale = 0.5
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (statusbar.value < 20) {
        statusbar.value = 20
        sprites.destroy(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    score += 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    spriteutils.setLifeImage(img`
        2 2 2 2 2 2 2 2 2 
        2 2 1 1 2 1 1 2 2 
        2 1 1 1 1 1 1 1 2 
        2 1 1 1 1 1 1 1 2 
        2 2 1 1 1 1 1 2 2 
        2 2 2 1 1 1 2 2 2 
        2 2 2 2 1 2 2 2 2 
        `)
    sprite.setFlag(SpriteFlag.Invisible, true)
    pause(3000)
    sprite.setFlag(SpriteFlag.Invisible, false)
})
let projectile: Sprite = null
let mySprite: Sprite = null
let index = 0
let list: Image[] = []
let statusbar: StatusBarSprite = null
statusbar = statusbars.create(6, 90, StatusBarKind.Bullets)
statusbar.max = 20
statusbar.setLabel("Bulets", 5)
statusbar.setPosition(142, 68)
statusbar.setColor(2, 4)
statusbar.setBarBorder(1, 5)
let mySprite2 = sprites.create(img`
    . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
    6 6 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
    6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
    6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    `, SpriteKind.HUD)
mySprite2.setFlag(SpriteFlag.RelativeToCamera, true)
mySprite2.setPosition(140, 9)
spriteutils.setLifeImage(img`
    2 2 2 2 2 2 2 2 2 
    2 2 1 1 2 1 1 2 2 
    2 1 1 1 1 1 1 1 2 
    2 1 1 1 1 1 1 1 2 
    2 2 1 1 1 1 1 2 2 
    2 2 2 1 1 1 2 2 2 
    2 2 2 2 1 2 2 2 2 
    `)
info.setLife(3)
let score = 0
tiles.setCurrentTilemap(tilemap`level2`)
scene.setBackgroundImage(img`
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `)
Render.getRenderSpriteInstance().setPosition(30, 25)
let mySprite3 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . f . . . . . . . 
    . . . . . . . f f f . . . . . . 
    . . . . . . f f f f f . . . . . 
    . . f . . . f f f f f . . f . . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    . f f f . . f f f f f . f f f . 
    `, SpriteKind.Food)
mySprite3.setPosition(200, 0)
for (let index2 = 0; index2 < 8; index2++) {
    list = [
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f 2 2 2 2 2 2 f f f . . 
        . . f f 2 2 2 2 2 2 2 2 2 f . . 
        . f f 2 2 f f f f f f 2 2 f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 2 2 2 2 e d d 4 e . . 
        . . e 4 f 2 2 2 2 e d d e . . . 
        . . . . f 4 4 2 2 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 8 8 f f f . . . . 
        . . . f f f 8 8 8 8 f f f . . . 
        . . f f f 8 8 8 8 8 8 f f f . . 
        . . f f 8 8 8 8 8 8 8 8 8 f . . 
        . f f 8 8 f f f f f f 8 8 f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 8 8 8 8 e d d 4 e . . 
        . . e 4 f 8 8 8 8 e d d e . . . 
        . . . . f 4 4 8 8 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 6 6 f f f . . . . 
        . . . f f f 6 6 6 6 f f f . . . 
        . . f f f 6 6 6 6 6 6 f f f . . 
        . . f f 6 6 6 6 6 6 6 6 6 f . . 
        . f f 6 6 f f f f f f 6 6 f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 6 6 6 6 e d d 4 e . . 
        . . e 4 f 6 6 6 6 e d d e . . . 
        . . . . f 4 4 6 6 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 5 5 f f f . . . . 
        . . . f f f 5 5 5 5 f f f . . . 
        . . f f f 5 5 5 5 5 5 f f f . . 
        . . f f 5 5 5 5 5 5 5 5 5 f . . 
        . f f 5 5 f f f f f f 5 5 f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 5 5 5 5 e d d 4 e . . 
        . . e 4 f 5 5 5 5 e d d e . . . 
        . . . . f 4 4 5 5 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `
    ]
    index = randint(0, list.length - 1)
    mySprite = sprites.create(list[index], SpriteKind.Enemy)
    Render.takeoverSceneSprites()
    mySprite.scale = 0.5
    mySprite.setBounceOnWall(true)
    mySprite.setVelocity(10, 8)
    tiles.placeOnRandomTile(mySprite, assets.tile`transparency16`)
}
game.onUpdate(function () {
    mySprite2.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    if (score == 0) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 1) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 2 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 2) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 2 2 2 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 3) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 4) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 8 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 2 2 2 2 2 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 5) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 2 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 6) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 7) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 2 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 8 8 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    } else if (score == 8) {
        mySprite2.setImage(img`
            . . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            . 6 6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 
            6 6 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 2 8 8 8 2 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 2 2 2 8 8 8 8 8 8 8 6 
            6 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `)
    }
})
game.onUpdate(function () {
    if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
        game.gameOver(true)
    }
})
