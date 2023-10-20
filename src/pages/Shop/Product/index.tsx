import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { TProductProps } from "./types";

const Product = ({ title, images, price, discountPercentage }: TProductProps) => {
    const [image, setImage] = useState(0);

    const toRight = () => {
        if (image + 1 < images.length) {
            setImage(image + 1);
        } else {
            setImage(0);
        }
    };

    const toLeft = () => {
        if (image - 1 >= 0) {
            setImage(image - 1);
        } else {
            setImage(images.length - 1);
        }
    };

    return (
        <div className="product">
            <div className="header">
                <h3 title={title}>{title.length > 26 ? title.slice(0, 26) + "..." : title}</h3>
                <img src={images[image]} alt={images[image]} />
                {images.length > 1 ? (
                    <div className="actions">
                        <FontAwesomeIcon icon={faChevronLeft} onClick={toLeft} />
                        <FontAwesomeIcon icon={faChevronRight} onClick={toRight} />
                    </div>
                ) : null}
            </div>
            <div className="footer">
                <button>
                    Buy for <span>{(price - (price * discountPercentage) / 100).toFixed(2)}$</span>{" "}
                    <sup className="real-price">
                        <span>{price}$</span> -{discountPercentage}%
                    </sup>
                </button>
            </div>
        </div>
    );
};

export default Product;
