import Image from "next/image";


interface imageurl{
url :string
}
const ImageComponent:React.FC<imageurl>= ({url})=>{
    return(
        <div>
             <Image src={url} alt="My Image" width={500} height={300} className="w-100 p-0" />
        </div>
    )
}

export default ImageComponent;