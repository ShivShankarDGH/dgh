'use strict';

class Popupcontainer extends React.Component {

  render() {

    return (
        <div className="add-element popup" title="Add Element">+
            <span className="popuptext" id="myPopup">
                <div className="form-field">
                    <h5><span className="left">Form Fields</span><span class="right" title="Hide">x</span></h5>
                    <button>Start</button>
                    <button id="two-element">Conformation</button>
                </div>
            </span>
        </div>
    );
  }
}

const domContainer = document.querySelector('#popup_container');
ReactDOM.render(e(Popupcontainer), domContainer);