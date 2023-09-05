import React from 'react';

function Footer(props) {
  return (
    <section className={props.darkMode ? 'w-full bg-slate-900 py-10 py-10 text-white' : 'w-full bg-slate-300 py-10 pt-10 text-black'}>
      <div className='text-center'>
        <h2>Anomy. LLC. Copyright 2023 - All Rights Reserved</h2>
        <div className='mt-4'>
          <a className="m-4" href="#">Terms of Privacy</a>
          <a className="m-4" href="#">Terms of Service</a>
          <a className="m-4" href="#">Terms of Guidelines</a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
