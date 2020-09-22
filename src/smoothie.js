class Smoothie
{
    constructor(speed, smoothness)
    {
        this.tar = document.documentElement
        this.pos = this.tar.scrollTop
        this.mov = false
        this.scr = false
        this.spd = speed
        this.smt = smoothness

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

        window.addEventListener('mousedown', e =>
        {
            if(e.offsetX > e.target.clientWidth)
            {
                this.scr = true
                this.pos = scrollY
            }
        })

        window.addEventListener('mouseup', e =>
        {
            if(this.scr)
            {
                this.scr = false
                this.pos = scrollY
            }
        })
    }

    onScroll(e)
    {
        e.preventDefault()

        let min = this.tar.scrollHeight - this.tar.clientHeight
        
        this.pos += this.normalizeDelta(e) * this.spd

        this.pos = Math.max(0, Math.min(this.pos, min))

        if(!this.mov)
        {
            this.update()
        }
    }

    normalizeDelta(e)
    {
        return Math.sign(e.detail || e.deltaY || e.wheelDelta)
    }

    update() 
    {
        this.mov = true

        let delta = (this.pos - this.tar.scrollTop) * this.smt

        this.tar.scrollTop += delta

        if(Math.abs(delta) > .5)
        {
            requestAnimationFrame(this.update.bind(this))
        }
        else
        {
            this.mov = false
        }
    }
}