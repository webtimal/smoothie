class Smoothie
{
    constructor(speed = 200, smoothness = .08)
    {
        this.tar = document.documentElement
        this.pos = this.tar.scrollTop
        this.mov = false
        this.scr = false 
        this.spd = speed
        this.smt = smoothness

        if ('scrollRestoration' in history)
        {
            history.scrollRestoration = 'manual'
        }

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

        document.querySelectorAll('a[href^="#"]').forEach(a =>
        {
            a.addEventListener('click', this.onAnchorClick.bind(this))
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

        if(Math.abs(delta) < .5 && this.pos > 0 && this.pos < this.tar.scrollHeight)
        {
            return this.mov = false
        }

        delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta)

        this.tar.scrollTop += delta

        requestAnimationFrame(this.update.bind(this))
    }

    onAnchorClick(e)
    {
        e.preventDefault()

        let id = e.currentTarget.getAttribute('href').replace('#', '')

        this.scrollToId(id)
    }

    scrollToId(id)
    {
        this.scrollTo(document.getElementById(id).offsetTop)
    }

    scrollTo(y)
    {
        window.scrollTo({
            top: y,
            behavior: 'smooth' 
        })

        this.pos = y
    }
}

window.Smoothie = Smoothie

module.exports = Smoothie