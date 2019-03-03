import PhotoEditor from '../containers/PhotoEditor'
import log from '../utils/log'

export default class PhotoEditorControl extends PhotoEditor {
    constructor() {
        super()
        this.generateButton = document.getElementById( "generateButton" );
        this.generateButton.onclick = this.generateButtonOnClick.bind(this)
        this.movePhotoLeftButton = document.getElementById("movePhotoLeft")
        this.movePhotoLeftButton.onclick = this.movePhotoButtonOnclick.bind(this, -50, 0)
        this.movePhotoRightButton = document.getElementById("movePhotoRight")
        this.movePhotoRightButton.onclick = this.movePhotoButtonOnclick.bind(this, +50, 0)
        this.movePhotoUpButton = document.getElementById("movePhotoUp")
        this.movePhotoUpButton.onclick = this.movePhotoButtonOnclick.bind(this, 0, +50)
        this.movePhotoDownButton = document.getElementById("movePhotoDown")
        this.movePhotoDownButton.onclick = this.movePhotoButtonOnclick.bind(this, 0, -50)
        this.scalePhotoDownButton = document.getElementById("scalePhotoDown")
        this.scalePhotoDownButton.onclick = this.scalePhotoButtonOnclick.bind(this, -0.1)
        this.scalePhotoUpButton = document.getElementById("scalePhotoUp")
        this.scalePhotoUpButton.onclick = this.scalePhotoButtonOnclick.bind(this, +0.1)
        this.importButton = document.getElementById( "import" );
        this.importButton.onclick = this.importButtonOnclick.bind(this)               
    }
    scalePhotoButtonOnclick(scale) {
        this.scale += Number(scale)
        this.fitImageOn(this.ctx.canvas, this.img, this.sx, this.sy, this.scale) 
    }
    movePhotoButtonOnclick(sx, sy) {
        this.sx += Number(sx)
        this.sy += Number(sy)
        this.fitImageOn(this.ctx.canvas, this.img, this.sx, this.sy, this.scale)     
    }    
    importButtonOnclick() {
        var imgLoaded = JSON.parse(localStorage.getItem("img"));
        this.img.src = imgLoaded.src
        this.printDescription = JSON.parse(localStorage.getItem("printDescription"));
        this.file.name = localStorage.getItem("file.name");    
        this.scale = Number(localStorage.getItem("scale"));
        this.sx = Number(localStorage.getItem("sx"))
        this.sy = Number(localStorage.getItem("sy"))
    
        this.renderImage()
        log(JSON.stringify(this.printDescription, null, 4))
    
    
    }

    generateButtonOnClick( e ) {
        log(JSON.stringify(this.printDescription, null, 4))
    };  
}