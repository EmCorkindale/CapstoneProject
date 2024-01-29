import { Image } from "react-bootstrap"
export function BottomSection() {
    return (
        <section className='bottomSection'>
            <div>
                <Image src={"../src/assets/homeImage.png"} className='bottomImage' />
            </div>
            <div>

                <h1 className='bottomText'>Welcome to Property Prospector,<br /> your property matching partner.</h1>
            </div>
        </section>
    )
}