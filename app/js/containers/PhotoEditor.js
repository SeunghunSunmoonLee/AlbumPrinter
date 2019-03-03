import canvasImageCoverPosition from '../utils/canvasImageCoverPosition';
import log from '../utils/log'

export default class PhotoEditor {
    constructor() {
        this.fileSelector = document.getElementById( "fileSelector" );
        this.fileSelector.addEventListener("change", this.fileSelectorOnChange.bind(this))
        // this.fileSelector.onchange = this.fileSelectorOnChange.bind(this)
        this.imageContainer = document.getElementById( "imageContainer" );
        this.debugContainer = document.getElementById( "debugContainer" );

        this.dpi_x = document.getElementById('dpi').offsetWidth;
        this.dpi_y = document.getElementById('dpi').offsetHeight;
        
        // set canvas ratio according to 15" x 10"
        this.canvas=document.getElementById('cv');
        this.canvas.width = 600
        this.canvas.height = 400    
        this.canvas.style.width = this.canvas.width + "px"; 
        this.canvas.style.height = this.canvas.height + "px";   

        this.ctx= this.canvas.getContext('2d');
        this.img = new Image();
        this.printDescription
        this.scale = 1
        this.sx = 0
        this.sy = 0
        this.file = {}
    }
  
    fileSelectorOnChange(e) {
        // get all selected Files
        let files = e.target.files;
        for ( let i = 0; i < files.length; ++i ) {
            this.file = files[ i ];
            // check if file is valid Image (just a MIME check)
            switch ( this.file.type ) {
                case "image/jpeg":
                case "image/png":
                case "image/gif":
                    // read Image contents from file
                    let reader = new FileReader();
                    reader.onload = ( e ) => {
                        // create HTMLImageElement holding image data
                        this.img.src = reader.result;
                        // console("this.img.src", this.img.src)
                        localStorage.setItem("img", JSON.stringify({naturalWidth: this.img.naturalWidth, naturalHeight: this.img.naturalHeight, src: reader.result}))
                        this.renderImage()
                    };
                    reader.readAsDataURL( this.file );
                    // process just one file.
                    return;
                default:
                    log( "not a valid Image file :" + this.file.name );
            }
        }
    }
    fitImageOn(canvas, img, sx, sy, scale) {
        let imageAspectRatio = img.width / img.height;
        let canvasAspectRatio = canvas.width / canvas.height;
        let sWidth, sHeight, dHeight, dWidth, dx, dy, imgWidth, imgHeight;
    
        imgWidth = img.width * scale
        imgHeight = img.height * scale
    
        this.ctx.clearRect(0,0,canvas.width, canvas.height);    
        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        sWidth = imgWidth
        sHeight = imgHeight
        dx = 0
        dy = 0
    
        let imagePosition = canvasImageCoverPosition(imgWidth, imgHeight, canvas.width, canvas.height, sx, sy)
        imagePosition.offsetLeft = sx
        imagePosition.offsetTop = sy
        if(imagePosition.width * scale >= canvas.width && imagePosition.height * scale >= canvas.height) {
            this.ctx.drawImage(
                img,
                imagePosition.offsetLeft,
                imagePosition.offsetTop,
                imagePosition.width * scale,
                imagePosition.height * scale
            );
        } else {
            this.ctx.drawImage(
                img,
                imagePosition.offsetLeft,
                imagePosition.offsetTop,
                imagePosition.width,
                imagePosition.height
            );        
        }
    
        this.printDescription = {
            canvas: {
                width: 15,
                height: 10,
                photo: {
                    id: this.file.name,
                    width: img.width / this.dpi_x,
                    height: img.height / this.dpi_y,
                    x: sx / this.dpi_x,
                    y: sy / this.dpi_y 
                }
            }
        }
        // ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        localStorage.setItem("printDescription", JSON.stringify(this.printDescription))
        localStorage.setItem("file.name", JSON.stringify(this.file.name))
        localStorage.setItem("scale", scale)
        localStorage.setItem("sx", sx)
        localStorage.setItem("sy", sy)
        // localStorage.setItem("img", canvas.toDataURL());
    
        this.ctx.drawImage(img, dx, dy, dWidth, dHeight);
    };

    renderImage() {
        // remove existing images from ImageContainer
        while ( this.imageContainer.childNodes.length > 0 )
            this.imageContainer.removeChild( this.imageContainer.childNodes[ 0 ]);
    
        // add image to container
        this.imageContainer.appendChild( this.img );
    
        this.img.onload = () => {
            this.fitImageOn(this.ctx.canvas, this.img, this.sx, this.sy, this.scale)
    
            // grab some data from the image
            var imageData = {
                "width": this.img.naturalWidth,
                "height": this.img.naturalHeight
            };
            log( "Loaded Image w/dimensions " + imageData.width + " x " + imageData.height );
        }    
    }

}