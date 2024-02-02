import { Image } from 'react-bootstrap';



export default function Home() {

    return (
        <>
            <section className='homeComponent'>
                <div>
                    <h1 className='homeHeading'>Welcome to Property Prospector,<br /> your property matching partner.</h1>
                </div>
                <div>
                    <Image src={"../src/assets/homeImage.png"} className='homeImage' />
                </div>
            </section>
            <section className='homeComponentParagraph'>
                <div>
                    <p className="homeText">Property Prospector is aimed at making your life easier! Our goal is to reduce the amount of time you spend hunting for houses. We aim to actively target your passive database and increase your bottom line. <br></br>Sign up today!</p>
                </div>
            </section>
        </>
    )
}