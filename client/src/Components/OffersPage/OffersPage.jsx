import OfferCard from "../OfferCard/OfferCard";
import AllOffersArray from "../../data";
import "./OffersPage.css";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";


const OffersPage = ()=>{

  const [offers, setOffers] = useState("AllOffers");
 
  let box = null;
  let boxOne = null;
  let boxTwo = null;
  let boxThree = null;
  const leftButton=()=>{
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft-width
    console.log(width)
  }

  const rightButton=()=>{
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft+width
    console.log(width)
  }

  const leftButtonOne=()=>{
    let width = boxOne.clientWidth;
    boxOne.scrollLeft = boxOne.scrollLeft-width
    console.log(width)
  }

  const rightButtonOne=()=>{
    let width = boxOne.clientWidth;
    boxOne.scrollLeft = boxOne.scrollLeft+width
    console.log(width)
  }


  const collectionLeftButton=()=>{
    let width = boxTwo.clientWidth;
    boxTwo.scrollLeft = boxTwo.scrollLeft-240
    console.log(width)
  }

  const collectionRightButton=()=>{
    let width = boxTwo.clientWidth;
    boxTwo.scrollLeft = boxTwo.scrollLeft+240
    console.log(width)
  }

  const wondersLeftButton=()=>{
    let width = boxThree.clientWidth;
    boxThree.scrollLeft = boxThree.scrollLeft-240
    console.log(width)
  }

  const wondersRightButton=()=>{
    let width = boxThree.clientWidth;
    boxThree.scrollLeft = boxThree.scrollLeft+240
    console.log(width)
  }

  

  useEffect(()=>{
    box = document.getElementById("Offers-card-container-2");
    boxOne = document.getElementById("slider-list");
    boxTwo = document.getElementById("collectionSlider");
    boxThree = document.getElementById("wondersSlider");
    let btnList = document.getElementsByClassName("anchor"); 

    for(let i=0;i<btnList.length;i++){
      btnList[i].addEventListener('click', ()=>{
          document.querySelector('.anchorOne')?.classList.remove('anchorOne');
          btnList[i].classList.add('anchorOne')
      });
    }
  }, [offers])

    return(
    <div className="container">
       <div className="Offers-card-container">
           <div className="Offers-total-container">
            <h1 className="Offers-heading">Offers</h1>
            <div className="ul-container">
                <ul className="offer-titles-container">
                    <li className="list-type"><a className="anchor anchorOne" href="#Offers-card-container-2" onClick={(e)=>{e.preventDefault();setOffers("AllOffers")}}>ALL OFFERS</a></li>
                    <li className="list-type"><a className="anchor" href="Offers-card-container-2" onClick={(e)=>{ e.preventDefault();  setOffers("bankOffer")}}>BANK OFFERS</a></li>
                    <li className="list-type"><a className="anchor" href="#Offers-card-container-2" onClick={(e)=>{e.preventDefault();setOffers("Offers")}}> OFFERS</a></li>
                    <li className="list-type"><a className="anchor" href="#Offers-card-container-2" onClick={(e)=>{ e.preventDefault();setOffers("flights")}}>FLIGHTS</a></li>
                    <li className="list-type"><a className="anchor" href="#Offers-card-container-2" onClick={(e)=>{ e.preventDefault();setOffers("hotels")}}>HOTELS</a></li>
                    <li className="list-type"><a className="anchor" href="#Offers-card-container-2" onClick={(e)=>{ e.preventDefault();setOffers("holiday")}}>HOLIDAYS</a></li>
                    <li className="list-type"><a className="anchor" href="#Offers-card-container-2" onClick={(e)=>{ e.preventDefault();setOffers("cabs")}}>CABS</a></li>
                    <li className="list-type"><a className="anchor" href="#Offers-card-container-2" onClick={(e)=>{ e.preventDefault();setOffers("others")}}>OTHERS</a></li>
                </ul>
                <hr className="horizontal-line"/>                                                                
              </div>
              <div className="btn-container">
              <button className="button-carousel-left" onClick={leftButton}><p className="less-than">&lt;</p></button> 
              <button className="button-carousel-right" onClick={rightButton}><p className="less-than">&gt;</p></button>
              </div>

        </div>
        <div id="Offers-card-container-2">
           {AllOffersArray.map((eachItem, index) => {
            if(eachItem["offerType"]===offers){
                return <OfferCard eachItem={eachItem} key={index}/>
            }
            return false;
           })}
        </div>
       </div>
       <div className="carousel">
       <button className="button-carousel-left One" onClick={leftButtonOne}><p className="less-than">&lt;</p></button> 
       <button className="button-carousel-right Two" onClick={rightButtonOne}><p className="less-than">&gt;</p></button>
       <div id="Offers-card-container-3">
          <div id="slider-list">
           <div className="card-cartoon">
              <img src="https://promos.makemytrip.com/notification/xhdpi/Vande-Flight-10072020.png" alt="cartoon-plane" className="cartoon-card-image"/>
              <div className="cartoon-description">
                <h1 className="cartoon-heading">Planning to book an international flight?</h1>
                <p className="cartoon-para">Call 0124-4628747 for booking assistance</p>
              </div>
           </div>
           <div className="card-cartoon">
              <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/language1@2x_20210901.png" alt="cartoon-plane" className="cartoon-card-image"/>
              <div className="cartoon-description">
                <h1 className="cartoon-heading">We are now available in हिंदी!</h1>
                <p className="cartoon-para color-blue">click here to change language</p>
              </div>
           </div>
           <div className="card-cartoon">
              <img src="https://promos.makemytrip.com/notification/xhdpi/web-check-in-116x116-23062020.png" alt="cartoon-plane" className="cartoon-card-image"/>
              <div className="cartoon-description">
                <h1 className="cartoon-heading">Complete your web check-in on MakeMyTrip in easy steps.</h1>
                <p className="cartoon-para color-blue">click to know more</p>
              </div>
           </div>
           <div className="card-cartoon">
              <img src="https://promos.makemytrip.com/notification/xhdpi/Flight-update_a21052020.png" alt="cartoon-plane" className="cartoon-card-image"/>
              <div className="cartoon-description">
                <h1 className="cartoon-heading">Taking a flight?</h1>
                <p className="cartoon-para color-blue">Click to check your travel guidelines</p>
              </div>
           </div>
           <div className="card-cartoon">
              <img src="https://promos.makemytrip.com/notification/xhdpi/Flight-update_a21052020.png" alt="cartoon-plane" className="cartoon-card-image"/>
              <div className="cartoon-description">
                <p className="cartoon-para">Check international destinations open for Indians here, with their guidelines</p>
              </div>
           </div>
          </div>
        </div>
      </div>
      <div className="download-app-card">
          <h1 className="download-heading">Download App Now !</h1>
          <p className="download-para">Get India's #1 travel super app, join 100 Million+ happy travellers!</p>
        <div className="two-image-container">
          <div className="download-image-input-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfcaJ_fSucA3BsYKZJfePhco69I9vZeBEaA&usqp=CAU" alt="mobile-download" className="download-image"/>
          <div>
            <p className="download-para-2">Use code <span className="span-download">WELCOMEMMT</span> and get upto <span className="span-download">Rs 1200</span> off on your first domestic flight booking</p>
            <div className="input-app-link">
            <div className="input-container">
              <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_mmt_ui_assets/in_v2.webp" alt="flag" className="flag-image"/>
              <p className="number-para">+91</p>
              <input  type="text" placeholder="Enter mobile number" className="input-download"/>
            </div>
            <p className="app-link">GET APP LINK</p>
            </div>
          </div>
          </div>

          <div>
             <p className="qr-para">MORE WAYS TO GET THE APP</p>
              <div>
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNMP0kx0Mqkcbj5SeM9bXUGtm9AIqOEDdprw&usqp=CAU" alt="download" className="download-image-2"/>
             <img src="https://promos.makemytrip.com/notification/xhdpi/QRCodeDT_QR-code.jpg" alt="qr" className="QR-Code"/>
              </div>
          </div>
        </div>
      </div> 

       <div className="handPickedCollections-card">
         <div className="collection-heading-btn-container">
           <h1 className="collection-heading">Handpicked Collections for You</h1>
           <div className="btn-container">
              <button className="button-carousel-left" onClick={collectionLeftButton}><p className="less-than">&lt;</p></button> 
              <button className="button-carousel-right" onClick={collectionRightButton}><p className="less-than">&gt;</p></button>
            </div>
         </div>
          <div id="collectionSlider" className="collection-slider">
           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_romantic44_p_540_417.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">Romantic Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_honeymoon11_p_540_417.jpg" alt="collection" className="collection-image"/>
             <p className="top11 bottom">Top 11</p>
             <p className="collection-para">Honeymoon Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/TI/mmt/activities/m_curated_collection_international_destination_july_p_403_403.jpg" alt="collection" className="collection-image"/>
             <p className="top11 bottom">Top 11</p>
             <p className="collection-para">International Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_beach44_p_540_417.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">Beach Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">Weekend Getaways</p>
           </div>
           
            <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">Hill Stations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/Australia/mmt/destination/m_Australia_destination_6_l_361_641.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">Adventure Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/amritsar/mmt/destination/m_Amritsar_activity_heritage_l_684_1026.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">Heritage Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_pilgrimage44_p_540_417.jpg" alt="collection" className="collection-image"/>
             <p className="top11 bottom">Top 11</p>
             <p className="collection-para">Piligrimage Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/alleppey/mmt/destination/m_destination-alleppey-landscape_l_400_640.jpg" alt="collection" className="collection-image"/>
             <p className="top11">Top 11</p>
             <p className="collection-para">relaxation Destinations</p>
           </div>
           </div>
       </div>



        <div className="handPickedCollections-card">
         <div className="collection-heading-btn-container">
           <h1 className="collection-heading">Unlock Lesser-Known Wonders of India</h1>
           <div className="btn-container">
              <button className="button-carousel-left" onClick={wondersLeftButton}><p className="less-than">&lt;</p></button> 
              <button className="button-carousel-right" onClick={wondersRightButton}><p className="less-than">&gt;</p></button>
            </div>
         </div>
          <div id="wondersSlider" className="collection-slider">
           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/malvan/mmt/destination/m_Malvan_l_636_847.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">Hidden Gem along Maharashtra's Coast</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/yelagiri/mmt/destination/m_destination_yelagiri_landscape_l_340_544.jpg" alt="collection" className="collection-image"/>
            
             <p className="collection-para">Picture-Perfect Hill Station in Tamil Nadu</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/araku/mmt/destination/m_destination_Araku%20Valley_landscape_l_400_640.jpg" alt="collection" className="collection-image"/>
            
             <p className="collection-para">Hill Retreat in Andhra Pradesh</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/sasan/mmt/destination/m_destination_sasan_gir_l_400_640.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">Nature Lover's Paradise in Gujarat</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">Weekend Getaways</p>
           </div>
           
            <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">Hill Stations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/Australia/mmt/destination/m_Australia_destination_6_l_361_641.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">Adventure Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/amritsar/mmt/destination/m_Amritsar_activity_heritage_l_684_1026.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">Heritage Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_pilgrimage44_p_540_417.jpg" alt="collection" className="collection-image"/>
            
             <p className="collection-para">Piligrimage Destinations</p>
           </div>

           <div className="image">
             <img src="https://hblimg.mmtcdn.com//content/hubble/img/alleppey/mmt/destination/m_destination-alleppey-landscape_l_400_640.jpg" alt="collection" className="collection-image"/>
             
             <p className="collection-para">relaxation Destinations</p>
           </div>
           </div>
       </div>
    
    </div>
    )
}

export default OffersPage