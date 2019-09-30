class Sprite {
    x;
    y;
    div;
    isAdded = false;
    isCompleted = false;
    cssStyle;

    type = 0;

    static TYPE = {
        CIRCLE: "CIRCLE",
        REACTANGE: "REACTANGE",
        BUBBLE: "BUBBLE",
    }

    constructor(...args) {
        this.div = document.createElement("div");
        this.initStyle();
        this.initComplete();
    }


    initStyle() { }

    initComplete() { this.isCompleted = true; }

    update(delta) { }

    dispose() { this.div = null; }

    drawCall() {
        if (this.isAdded && this.isCompleted) {
            this.div.style = `transform: matrix(1,0,0,1,${this.x},${this.y});`;
            // this.div.innerHTML = `${this.circleVO.life}`;
        }
    }

    addToStage() {
        this.isAdded = true;
        this.drawCall();
    }

    removeToStage() {
        this.isAdded = false;
    }

    _width;
    get width() {
        if (!this._width) {
            if (!this.cssStyle) this.cssStyle = window.getComputedStyle(this.div);
            let wv = this.cssStyle.getPropertyValue('width');
            if (wv) {
                this._width = wv.slice(0, wv.length - 2);
            }
        }
        return this._width || 0;
    }

    _height;
    get height() {
        if (!this._height) {
            if (!this.cssStyle) this.cssStyle = window.getComputedStyle(this.div);
            let hv = this.cssStyle.getPropertyValue('height');
            if (hv) {
                this._height = hv.slice(0, hv.length - 2);
            }
        }
        return this._height || 0;
    }
}

class CircleVO {
    speedX = 0;
    speedY = 0;
    gravity = 0;
    life = 1;
    bounce = 1000;

    constructor(sx, sy, g = 10, l, b = 1) {
        this.speedX = sx;
        this.speedY = sy;
        this.gravity = g;
        this.life = l;
        this.bounce = b;
    }
}

class Circle extends Sprite {

    level = 1;
    circleVO;

    up = false;
    gravity = 0;
    bounce = 0;

    constructor(lv, direction) {
        super();
        this.type = Sprite.TYPE.CIRCLE;
        this.level = lv || 1;
        this.reset(lv, direction);
    }

    /**充值样式 */
    reset(lv, direction) {
        this.level = lv;
        var voCfg = GameGlobal.inst().levelCfg.get(this.level);
        this.circleVO = Object.assign({}, voCfg);
        this.circleVO.speedX *= direction;
        this.initStyle();
    }

    initStyle() {
        if (this.isCompleted) {
            this.div.classList = [`level${this.level}`];
            this.div.id = "Circle";
        }
    }

    update(delta) {
        var vx = this.circleVO.speedX * delta / 1000;
        var vy = this.circleVO.speedY * delta / 1000;
        if (this.up) {
            this.bounce *= 0.9;
            vy += this.bounce * -1;
            if (this.bounce < 0.5) {
                this.up = false;
            }
        }
        else {
            this.gravity += this.circleVO.gravity;
            vy += this.gravity;
        }

        var dx = this.x + vx;
        var dy = this.y + vy;

        if (this.collisionBottom(dy) && !this.up) {
            this.up = true;
            // this.circleVO.speedY *= -1;
            this.bounce = this.circleVO.bounce;
            this.gravity = 0;
        }

        if (this.collisionSide(dx)) {
            this.circleVO.speedX *= -1;
            if (dx > stage.width - this.width / 2) {
                dx = stage.width - this.width / 2
            }

            if (dx < this.width / 2) {
                dx = this.width / 2;
            }
        }

        this.x = dx;
        this.y = dy;

        let rect_dia = parseInt(game.rectangle.width / 2);
        let dist_2 = game.mesualDist(this, game.rectangle)
        if (dist_2 < rect_dia) {
            game.catLife();
        }
    }

    collisionBottom(dy) {
        return (dy + this.width / 2) > window.stage.height;
    }

    collisionSide(dx) {
        return (dx < this.width / 2 || dx > window.stage.width - this.width / 2);
    }

    drawCall() {
        if (this.isAdded && this.isCompleted) {
            super.drawCall();
            this.div.innerHTML = `${this.circleVO.life}`;
        }
    }

    hit() {
        if (this.circleVO.life > 1) {
            this.circleVO.life--;
        }
        else {
            if (this.level > 1) {
                this.spit();
            }
            else {
                this.die(); //死亡得分
            }
        }
    }

    spit() {
        let cir1 = game.pool.getCircle(this.level - 1, 1);
        let cir2 = game.pool.getCircle(this.level - 1, -1);
        cir1.x = cir2.x = this.x;
        cir1.y = cir2.y = this.y;

        game.addCircle(cir1);
        game.addCircle(cir2);

        this.die();
    }

    die() {
        game.addResult();
        game.removeCircle(this);
    }
}

var stage;
class Stage extends Sprite {

    children = [];
    fps = 1000 / 45;
    delta = 0;
    prevtime = 0;

    constructor(cirVO) {
        super();
        this.prevtime = Date.now();
        setInterval(() => { this.render(); }, this.fps);
    }

    render() {
        var nTime = Date.now();
        this.delta = nTime - this.prevtime;
        this.prevtime = nTime;
        this.children.forEach(child => {
            child.update(this.delta);
            child.drawCall();
        });
    }

    initStyle() {
        this.div.id = "Stage";
    }

    initComplete() {
        document.body.appendChild(this.div);
    }

    addChild(spr) {
        if (!this.children.includes(spr)) {
            this.div.appendChild(spr.div);
            this.children.push(spr);
            spr.addToStage();
        }
    }

    removeChild(spr) {
        if (this.children.includes(spr)) {
            this.div.removeChild(spr.div);
            this.children.splice(this.children.indexOf(spr), 1);
            spr.removeToStage();
        }
    }
}

class Rectangle extends Sprite {

    ms_donw_flag = false;

    shoot_space = 100;
    shoot_speed = 500;
    process_time = 0;

    constructor() {
        super();
        this.type = Sprite.TYPE.REACTANGE;
        this.listener();
    }

    listener() {
        this.div.onmousedown = event => {
            this.ms_donw_flag = true;
        }

        document.body.onmousemove = event => {
            if (this.ms_donw_flag) {
                let mx = event.screenX - this.width / 2;
                var dx = mx;
                if (dx > stage.width - this.width) { dx = stage.width - this.width; }
                if (dx < 0) { dx = 0; }
                this.x = dx;
            }
        }

        document.body.onmouseup = event => {
            this.ms_donw_flag = false;
        }
    }

    removeList() {
        this.div.onmousedown = null;
        document.body.onmousemove = null;
        document.body.onmouseup = null;
    }

    update(delta) {
        let block = this.shoot_speed * delta / 1000;
        this.process_time += block;
        if (this.process_time >= this.shoot_space) {
            this.process_time -= this.shoot_space;
            game.shoot();
        }
    }

    dispose() {
        super.dispose();
        this.removeList();
    }

    drawCall() {
        if (this.isAdded && this.isCompleted) {
            super.drawCall();
            this.div.innerHTML = `${game.rect_life}`;
        }
    }

    initStyle() { this.div.id = "Rectangle"; }
}

class GameGlobal {
    static instance;
    static inst() {
        if (!GameGlobal.instance) GameGlobal.instance = new GameGlobal();
        return GameGlobal.instance;
    }

    levelCfg = new Map();
    constructor() {
        this.levelCfg.set(1, new CircleVO(120, -130, 0.2, 1, 13));
        this.levelCfg.set(2, new CircleVO(120, -130, 0.2, 5, 16));
        this.levelCfg.set(3, new CircleVO(120, -130, 0.2, 10, 20));
        this.levelCfg.set(4, new CircleVO(120, -130, 0.2, 15, 30));
        this.levelCfg.set(5, new CircleVO(120, -130, 0.2, 20, 40));
    }
}

class Bullet extends Sprite {
    speedY = 1;
    constructor() {
        super();
        this.type = Sprite.TYPE.BUBBLE
    }

    update(delta) {
        var vy = delta * this.speedY * -1;
        var dy = this.y + vy;
        if (dy < 0) {
            stage.removeChild(this);
            game.pool.resetBullet(this);
        }
        this.y = dy;
        game.hitCheck(this);
    }

    initStyle() {
        this.div.id = "Bullet";
    }
}

class Pool {

    bulletPool = [];
    circlePool = [];

    constructor() { this.initPool(); }

    initPool() {
        var bullet_count = 30;
        for (var i = 0; i < bullet_count; i++) {
            var bullet = new Bullet();
            this.bulletPool.push(bullet);
        }

        var circle_count = 50;
        for (var i = 0; i < circle_count; i++) {
            var circle = new Circle(1, 1);
            this.circlePool.push(circle);
        }
    }

    getCircle(lv, direction) {
        let cir;
        if (this.circlePool.length > 0) {
            cir = this.circlePool.shift();
        }
        else {
            cir = new Circle(1, 1);
        }
        cir.reset(lv, direction);
        return cir;
    }

    resetBullet(cir) {
        this.circlePool.push(cir);
    }

    getBullet() {
        if (this.bulletPool.length > 0) {
            return this.bulletPool.shift();
        }
        else {
            return new Bullet();
        }
    }

    resetBullet(bullet) {
        this.bulletPool.push(bullet);
    }
}

class Game {
    stage;
    pool;
    rectangle;
    circles = [];

    rect_life = 5;
    game_result = 0;

    constructor() {
        this.stage = window.stage = new Stage();
        this.pool = new Pool();
    }

    gameStop() {
        stage.removeChild(this.rectangle);
        this.clearCircle();
        openTip();
    }

    gameStart() {

        let cir_1 = this.pool.getCircle(4, 1)
        let cir_2 = this.pool.getCircle(5, -1)

        if (!this.rectangle) {
            this.rectangle = new Rectangle();
        }

        this.addCircle(cir_1);
        this.addCircle(cir_2);

        this.stage.addChild(this.rectangle);

        cir_1.x = 200;
        cir_1.y = 100;

        cir_2.x = 500;
        cir_2.y = 100;

        this.rectangle.x = this.stage.width - this.rectangle.width >> 1;
        this.rectangle.y = this.stage.height - this.rectangle.height;
    }

    addCircle(cir) {
        if (!this.circles.includes(cir)) { this.circles.push(cir); }
        stage.addChild(cir);
    }

    removeCircle(cir) {
        stage.removeChild(cir);
        let delIndex = this.circles.indexOf(cir);
        if (delIndex > -1) {
            this.circles.splice(delIndex, 1);
        }

        if (this.circles.length == 0 && this.rect_life > 0) {
            this.win()
        }
    }

    //发射子弹
    shoot() {
        let bullet = this.pool.getBullet();
        bullet.x = this.rectangle.x + this.rectangle.width / 2;
        bullet.y = this.rectangle.y;
        this.stage.addChild(bullet);
    }

    //碰撞监测
    hitCheck(bullet) {
        this.circles.forEach(element => {
            let dia = parseInt(element.width / 2) + parseInt(bullet.width / 2);
            let dist = this.mesualDist(element, bullet);
            if (dist < dia) {
                this.hitCircle(bullet, element);
                element.hit();
            }
        })
    }

    mesualDist(tag, src) {
        let vx = src.x - tag.x;
        let vy = src.y - tag.y;
        let dist = Math.sqrt(vx * vx + vy * vy);
        return dist;
    }

    //命中
    hitCircle(bullet, circle) {
        stage.removeChild(bullet);
        this.pool.resetBullet(bullet);
        console.log(`hit circle`);
    }

    clearCircle() {
        var removeList = this.circles.concat();
        removeList.forEach(element => {
            this.removeCircle(element);
        });
    }

    setLife(life) {
        this.rect_life = life;
        window.setLife(this.rect_life);
    }

    setResult(result) {
        this.game_result = result;
        window.setResult(this.game_result);
    }

    addResult() {
        this.game_result += 1;
        window.setResult(this.game_result);
    }

    win() {
        window.win();
        stage.removeChild(this.rectangle);
    }

    gameOver() {
        window.over();
        this.clearCircle();
        stage.removeChild(this.rectangle);
    }

    catLife() {
        this.rect_life = Math.max(0, this.rect_life - 1);
        window.setLife(this.rect_life);
        if (this.rect_life == 0) {
            this.gameOver();
        }
    }
}

var game;
var tip;
var tipContent;
window.onload = function () {
    this.game = new Game();
    this.tipContent = document.getElementById('tipContent');
    this.tip = document.getElementById('tip');
    document.getElementById('btn_start').onclick = () => {
        game.gameStart();
        this.game.setLife(500);
        this.game.setResult(0);
        closeTip();
    }
}

function openTip() {
    tip.style = 'display:block'
}

function closeTip() {
    tip.style = 'display:none';
}

function win() {
    window.openTip();
    tipContent.innerHTML = "恭喜游戏胜利"
}

function over() {
    window.openTip();
    tipContent.innerHTML = "!闯关失败 凸-_-凸!"
}

function setLife(life) {
    if (!this.span_life) {
        this.span_life = document.getElementById('span_life');
    }
    this.span_life.innerHTML = life;
}

function setResult(result) {
    if (!this.span_result) {
        this.span_result = document.getElementById('span_result');
    }
    this.span_result.innerHTML = result;
}
