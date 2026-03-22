import React from 'react';
import { translations, getLanguage } from '../i18n';
import '../styles/Heidelberg.css';

export default function Heidelberg() {
  const lang = getLanguage();
  const t = translations[lang];

  return (
    <div className='Heidelberg'>
      <h1>{t.heidelbergTitle}</h1>
      <p>
        {t.heidelbergIntro} <br />
        {t.heidelbergDescription} <br />
        {t.heidelbergCall}
        <br />
        {t.heidelbergClosing} <br />
        {t.heidelbergSignature}
      </p>
      <section className='restaurants'>
        <h3>{t.heidelbergRestaurants}</h3>

        <div className='places-in-HD'>
          <div className='card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5191.608630906053!2d8.707110076277274!3d49.41260617141261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c1064bd3d9df%3A0xf93572a0668a185d!2sVetter&#39;s%20Alt%20Heidelberger%20Brauhaus!5e0!3m2!1sde!2sde!4v1770028503338!5m2!1sde!2sde'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              title='Vetters Heidelberg'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <div className='restaurant-info'>
              <h4>Vetter's Alt Heidelberger Brauhaus 🍻</h4>
              <p>
                Steingasse 9
                <br />
                69117 Heidelberg
              </p>
              <a href='https://www.brauhaus-vetter.de/en' target='_blank' rel='noopener noreferrer'>
                Vetter's Alt Heidelberger Brauhaus
              </a>
            </div>
          </div>
          <div className='card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41540.716955877804!2d8.593472021679693!3d49.40333030000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c7c2ca123b35%3A0xaba49321a9866ec3!2sCenneto%20Weinbar!5e0!3m2!1sde!2sde!4v1770026873392!5m2!1sde!2sde'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              title='Cenneto'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <div className='restaurant-info'>
              <h4>Cenneto 🍷</h4>
              <p>
                Da-Vinci-Straße 16
                <br />
                69115 Heidelberg
              </p>
              <a href='https://cenneto.com/' target='_blank' rel='noopener noreferrer'>
                Cenneto - Website
              </a>
            </div>
          </div>
          <div className='card'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2596.887430422448!2d8.581077976275976!3d49.39212137140948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c74b8903363b%3A0xda16ccc562ac33d7!2sBhukkad%20Dhaba!5e0!3m2!1sde!2sde!4v1770027857747!5m2!1sde!2sde'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              title='Bhukkad Dhaba'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <div className='restaurant-info'>
              <h4>Bhukkad Dhaba 🥘</h4>
              <p>
                Hebelstraße 17
                <br />
                68723 Plankstadt
              </p>
              <a href='https://bhukkaddhaba.eu/en/bhukkad-dhaba-en/' target='_blank' rel='noopener noreferrer'>
                Bhukkad Dhaba - Website
              </a>
            </div>
          </div>
          <div className='card'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.776140238689!2d8.710600776915513!3d49.41313896150699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c1a81df9996d%3A0xb0cec22d395e79e1!2sKulturbrauerei%20Heidelberg!5e0!3m2!1sen!2sde!4v1774180697572!5m2!1sen!2sde"
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                title='Kulturbrauerei'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
            <div className='restaurant-info'>
              <h4>Kulturbrauerei Heidelberg 🍖🍺</h4>
              <p>
                Leyergasse 6
                <br/>
                69117 Heidelberg
              </p>
              <a href='http://www.heidelberger-kulturbrauerei.de/' target='_blank' rel='noopener noreferrer'>
                Kulturbrauerei Heidelberg - Website
              </a>
            </div>
          </div>
          <div className='card'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5191.523945924452!2d8.710770176915513!3d49.41340686148777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c107f9bc868b%3A0xc064598188ba871e!2sBent%20Bar%20-%20Heidelberg!5e0!3m2!1sen!2sde!4v1774180560212!5m2!1sen!2sde"
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                title='Bent Bar Heidelberg'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
            <div className='restaurant-info'>
              <h4>Bent Bar - Heidelberg 🍹</h4>
              <p>
                Leyergasse 2
                <br/>
                69117 Heidelberg
              </p>
              <a href='https://bentbar.de/' target='_blank' rel='noopener noreferrer'>
                Bent Bar - Heidelberg - Website
              </a>
            </div>
          </div>

          <div className='card'>
            <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2597.5733633407017!2d8.688536076275176!3d49.37914517140747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c17e199ec9e5%3A0xf0ec5edd5876128b!2zVGFpZuKAmHM!5e0!3m2!1sde!2sde!4v1770028073597!5m2!1sde!2sde'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              title='Taifs'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <div className='restaurant-info'>
              <h4>Taif's 🥙</h4>
              <p>
                Rathausstraße 52
                <br />
                69126 Heidelberg
              </p>
              <a href='https://taifs.de/' target='_blank' rel='noreferrer'>Taif's - Website</a>
            </div>
          </div>
        </div>
      </section>
      <section className='restaurants'>
        <h3>{t.heidelbergWhatElseToDo}</h3>
        <div className='places-in-HD'>
          <div className='card'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.9091850653226!2d8.712734276915391!3d49.4106230616854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c100ca43db93%3A0x6d672e3649e97eea!2sHeidelberg%20Castle!5e0!3m2!1sen!2sde!4v1774182403824!5m2!1sen!2sde"
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                title='Heidelberg Castle'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
            <div className='restaurant-info'>
              <h4>Heidelberger Schloss 🏰</h4>
              <p>{t.castleHikeText}<a href='https://www.komoot.com/de-de/smarttour/e729829737/wanderung-auf-dem-philosophenweg-in-heidelberg-wandern-in-den-staedten-des-suedens?ref=wdd' target= '_blank' rel='noreferrer'><u>{t.castleHikeLink}</u></a>{t.castleHikeEnd}</p>
              <p>{t.castleShorterText}<a href='https://www.komoot.com/de-de/smarttour/33488950?ref=wdd' target='_blank' rel='noreferrer'><u>{t.castleShorterLink}</u></a></p>
              <a href='https://www.schloss-heidelberg.de/' target='_blank' rel='noreferrer'>
                {t.castleWebsite}
              </a>
            </div>
          </div>
          <div className='card'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10385.098307299204!2d8.717435378523279!3d49.40371295567476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c04b27096443%3A0x3517a737f0048662!2sK%C3%B6nigstuhl!5e0!3m2!1sen!2sde!4v1774183142631!5m2!1sen!2sde"
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                title='Heidelberg Castle'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
            <div className='restaurant-info'>
              <h4>Königstuhl ⛰️</h4>
              <p>{t.koenigstuhlText}<a href='https://www.komoot.com/de-de/tour/1637870297' target= '_blank' rel='noreferrer'><u>{t.koenigstuhlLink}</u></a>{t.koenigstuhlEnd}</p>
              <a href='https://www.bergbahn-heidelberg.de/koenigstuhl' target='_blank' rel='noreferrer'>
                {t.koenigstuhlWebsite}
              </a>
            </div>
          </div>
          <div className='card'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10384.75865451467!2d8.702201728524392!3d49.40531885522206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c10682a91b93%3A0x55f7989b7c96f177!2sHeidelberg-Heidelberger%20Altstadt!5e0!3m2!1sen!2sde!4v1774184137366!5m2!1sen!2sde"
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                title='Heidelberg Castle'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
            <div className='restaurant-info'>
              <h4>Heidelberger Altstadt 👨‍🦳🏙️</h4>
              <a href='https://www.visit-bw.com/en/article/heidelberg-old-town/ae169718-dc73-40a4-9ec1-3f74084d8ed2#/'
                 target='_blank' rel='noopener noreferrer'>
                {t.altstadtWebsite}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
