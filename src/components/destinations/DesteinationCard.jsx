import React from 'react';

const DesteinationCard = () => {
    return (
        <div>
            It is a destination card
            <div className="card bg-base-100 image-full w-96 shadow-xl relative">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body opacity-0 absolute top-1/2 hover:opacity-100">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesteinationCard;