import React from "react";

const AppsZero = () => {
  return (
    <div className='container text-center'>
      <div className='row'>
        <h1 className='fs-2 '> The Zerodha Universe</h1>
        <p className='text-muted mb-5 '> Extend your trading and investment experience further with our partner platforms.</p>
        <div className='text-center mt-4'>
          <div className='row mb-5'>

            <div className='col-4'>
              <img style={{ width: "40%" }} src='media\images\smallcaseLogo.png' alt='smallcase' />
              <p className='text-muted mt-2'>Thematic investment platform</p>
            </div>
            <div className='col-4'>
              <img style={{ width: "40%" }} src='media\images\streakLogo.png' alt='streak' />
              <p className='text-muted mt-2'>Algo & stratgey platform</p>
            </div>
            <div className='col-4'>
              <img style={{ width: "40%" }} src='media\images\sensibullLogo.svg' alt='sensibull' />
              <p className='text-muted mt-2'>Options trading platform</p>
            </div>



          </div>
          <div className='row'>
            <div className='col-4'>
              <img style={{ width: "40%" }} src='media\images\zerodhaFundhouse.png' alt='zero-fundhouse' />
              <p className='text-muted mt-2'>Asset management</p>
            </div>
            <div className='col-4'>
              <img style={{ width: "40%" }} src='media\images\goldenpiLogo.png' alt='golden-pi' />
              <p className='text-muted mt-2'>Bond trading platform</p>
            </div>
            <div className='col-4'>
              <img style={{ width: "25%" }} src='media\images\dittoLogo.png' alt='ditto' />
              <p className='text-muted mt-2'>Insurance</p>
            </div>
            {/* <div className=' text-center row mt-5 mb-5'>
              <button style={{ width: "15%" }} className='btn p-2 btn-primary hero-btn fs-5 text-center'>
                Sign up now
              </button>
            </div> */}



          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsZero;
