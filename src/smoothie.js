import jQuery from 'jquery'

jQuery($ => new Smoothie)

class Smoothie
{
    constructor()
    {
        this.tar = (
            document.scrollingElement ||
            document.documentElement ||
            document.body.parentNode ||
            document.body
        )

        this.pos = this.tar.scrollTop
        this.mov = false
        this.spd = 80

        this.bindEvents()
    }

    bindEvents()
    {
        for(let event of ['mousewheel', 'DOMMouseScroll'])
        {
            this.tar.addEventListener(event, this.onScroll.bind(this), {
                passive: false
            })
        }
    }

    onScroll(e)
    {
        e.preventDefault()

        let min = this.tar.scrollHeight - this.tar.clientHeight

        this.pos -= this.normalizeDelta(e) * this.spd

        this.pos = Math.max(0, Math.min(this.pos, min))

        if(!this.mov)
        {
            this.update()
        }
    }

    normalizeDelta(e)
    {
        if(e.detail)
        {
            if(e.wheelDelta)
            {
                return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1)
            }

            return -e.detail / 3
        }

        return e.wheelDelta / 120
    }

    update() 
    {
        this.mov = true

        let delta = (this.pos - this.tar.scrollTop) * .08

        this.tar.scrollTop += delta

        if(Math.abs(delta) > .5)
        {
            this.getFrameCallback()(this.update.bind(this))
        }
        else
        {
            this.mov = false
        }
    }

    getFrameCallback()
    {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            (f => setTimeout(f, 20))
        )
    }
}