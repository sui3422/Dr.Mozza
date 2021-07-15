import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { CART_API } from '../../config';
import './Card.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      optionBtn: false,
      selected: false,
      selectedOption: '',
    };
  }

  openOptionBtn = () => {
    this.setState({
      optionBtn: true,
    });
  };

  changeSmaller = e => {
    this.setState({
      selected: false,
      selectedOption: e.target.value,
    });
  };

  changeBigger = e => {
    this.setState({
      selected: true,
      selectedOption: e.target.value,
    });
  };

  addToCart = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('TOKEN'),
      },
      body: JSON.stringify({
        selectedOption: this.state.selectedOption,
      }),
    };

    alert(`${this.props.name}이 장바구니에 추가되었습니다.`);
    fetch(CART_API, requestOptions);
  };

  render() {
    const { thumbnail, name, option, score, id, hoverImg } = this.props;
    const { optionBtn, selected } = this.state;
    return (
      <div className="cardContainer">
        <Link to={`/detail/${id}`}>
          <div className="cardImage">
            <img src={thumbnail} alt="productImg" className="thumbnailImage" />
            <img src={hoverImg} alt="productImg" className="hoverImage" />
          </div>
          <div className="cardTag">
            <div className="cheeseName">{name}</div>
            <div className="cheesePrice">
              ${!selected ? option[0].price : option[1].price}
            </div>
          </div>
          <div className="starRatings">
            <i className="fas fa-star" />
            <span>{score}</span>
          </div>
        </Link>
        <div className="btnWrapper">
          {option[1] ? (
            <>
              <button
                className={`btnStatic ${optionBtn ? 'hide' : ''}`}
                onClick={this.openOptionBtn}
              >
                CHOOSE SIZE
              </button>
            </>
          ) : (
            <>
              <button className="btnStatic" onClick={this.addToCart}>
                ADD TO CART
              </button>
            </>
          )}

          {optionBtn && (
            <>
              <div className={`btnOptionWrapper ${optionBtn ? '' : 'hide'}`}>
                <button
                  className={`btnOption ${selected ? '' : 'chosen'}`}
                  onClick={this.changeSmaller}
                  value={option[0].id}
                >
                  {option[0].weight}g
                </button>
                <button
                  className={`btnOption ${selected ? 'chosen' : ''}`}
                  onClick={this.changeBigger}
                  value={option[1].id}
                >
                  {option[1].weight}g
                </button>
              </div>
              <button className="btnStatic" onClick={this.addToCart}>
                {optionBtn ? 'ADD TO CART' : 'CHOOSE SIZE'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(Card);
