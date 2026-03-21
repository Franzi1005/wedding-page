import React from 'react';
import '../styles/Heidelberg.css';

export default function Heidelberg() {
  return (
    <div className='Heidelberg'>
      <h1>Welcome to Heidelberg</h1>
      <p>
        Heidelberg has been our chosen home for the last few years and it's also
        the place we met and fell in love❣️ <br />
        with it's beautiful castle ruins and charming little old town it's
        definitely a romantic place. <br />
        In case you're coming from afar and have a few days to spend here, below
        you can find a selection of ToDos and some of our favourite places to
        go, eat and drink!🍽️🍹
        <br />
        We hope you'll enjoy your time here! <br />
        Love, Christoph & Franzi
      </p>
      <section class='restaurants'>
        <h3>Best Bars and Restaurants in Heidelberg</h3>

        <div class='places-in-HD'>
          <div class='card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5191.608630906053!2d8.707110076277274!3d49.41260617141261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c1064bd3d9df%3A0xf93572a0668a185d!2sVetter&#39;s%20Alt%20Heidelberger%20Brauhaus!5e0!3m2!1sde!2sde!4v1770028503338!5m2!1sde!2sde'
              style={{ border: 0 }}
              allowfullscreen=''
              loading='lazy'
              referrerpolicy='no-referrer-when-downgrade'
            ></iframe>
            <div class='restaurant-info'>
              <h4>Vetter's Alt Heidelberger Brauhaus</h4>
              <p>
                Steingasse 9
                <br />
                69117 Heidelberg
              </p>
              <a href='https://www.brauhaus-vetter.de/en'>
                Vetter's Alt Heidelberger Brauhaus
              </a>
            </div>
          </div>
          <div class='card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41540.716955877804!2d8.593472021679693!3d49.40333030000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c7c2ca123b35%3A0xaba49321a9866ec3!2sCenneto%20Weinbar!5e0!3m2!1sde!2sde!4v1770026873392!5m2!1sde!2sde'
              style={{ border: 0 }}
              allowfullscreen=''
              loading='lazy'
              referrerpolicy='no-referrer-when-downgrade'
            ></iframe>
            <div class='restaurant-info'>
              <h4>Cenneto</h4>
              <p>
                Da-Vinci-Straße 16
                <br />
                69115 Heidelberg
              </p>
              <a href='https://cenneto.com/pages/flaschenweinkarte'>
                Cenneto - Website
              </a>
            </div>
          </div>
          <div class='places-in-HD'>
            <div class='card'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2596.887430422448!2d8.581077976275976!3d49.39212137140948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c74b8903363b%3A0xda16ccc562ac33d7!2sBhukkad%20Dhaba!5e0!3m2!1sde!2sde!4v1770027857747!5m2!1sde!2sde'
                style={{ border: 0 }}
                allowfullscreen=''
                loading='lazy'
                referrerpolicy='no-referrer-when-downgrade'
              ></iframe>
              <div class='restaurant-info'>
                <h4>Bhukkad Dhaba</h4>
                <p>
                  Hebelstraße 17
                  <br />
                  68723 Plankstadt
                </p>
                <a href='https://bhukkaddhaba.eu/en/bhukkad-dhaba-en/'>
                  Bhukkad Dhaba - Website
                </a>
              </div>
            </div>
          </div>
          <div class='places-in-HD'>
            <div class='card'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2597.5733633407017!2d8.688536076275176!3d49.37914517140747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c17e199ec9e5%3A0xf0ec5edd5876128b!2zVGFpZuKAmHM!5e0!3m2!1sde!2sde!4v1770028073597!5m2!1sde!2sde'
                style={{ border: 0 }}
                allowfullscreen=''
                loading='lazy'
                referrerpolicy='no-referrer-when-downgrade'
              ></iframe>
              <div class='restaurant-info'>
                <h4>Taif's</h4>
                <p>
                  Rathausstraße 52
                  <br />
                  69126 Heidelberg
                </p>
                <a href='https://taifs.de/'>Taif's</a>
              </div>
            </div>
          </div>
          <div class='places-in-HD'>
            <div class='card'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5191.528905280931!2d8.708105076277327!3d49.413359971412824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c107cdbf1a87%3A0x9afa2ed726e336df!2sCocodec!5e0!3m2!1sde!2sde!4v1770028357430!5m2!1sde!2sde'
                style={{ border: 0 }}
                allowfullscreen=''
                loading='lazy'
                referrerpolicy='no-referrer-when-downgrade'
              ></iframe>
              <div class='restaurant-info'>
                <h4>Cocodec</h4>
                <p>
                  Ob. Neckarstraße 5
                  <br />
                  69117 Heidelberg
                </p>
                <a href='https://cocodec-heidelberg.com/'>Cocodec</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
