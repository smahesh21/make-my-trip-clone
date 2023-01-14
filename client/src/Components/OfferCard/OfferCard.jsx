import "./OfferCard.css"

const OfferCard = (props)=>{
    const {eachItem} = props;
    const {image, para, heading, para1}  = eachItem;
    return(
        <div className="offer-card">
        <div className="image-description-container">
            <img src={image} alt="offer" className="offer-card-image"/>
            <div className="item-description">
                <p className="offer-card-para">{para}</p>
                <h1 className="offer-card-heading">{heading}</h1>
                <hr className="offer-line"/>
                <p className="offer-card-para">{para1}</p>
            </div>
        </div>
        <div className="booking-tc-container">
                <p className="text">T&C's Apply</p>
                <p className="bookNowTxt">BOOK NOW</p>
            </div>
        </div>
    )
}

export default OfferCard