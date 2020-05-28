import colors from "./Colors";
import React from "react";
import {FaGitlab} from "react-icons/fa";

export default function RentiFooter() {
  return (
    <div id="footer">
      <footer id="footer" role="contentinfo">
        <a href="#" className="gotop js-gotop"><i className="icon-arrow-up2"></i></a>
        <div className="container">
          <div className="">
            <div className="col-md-12 text-center">
              <p><strong>Renti 2020 &copy;</strong> All Rights Reserved. <br/><a href="https://www.ua.pt/deti/">Universidade
                de Aveiro - DETI</a></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <a href="https://gitlab.com/renti-software/"><FaGitlab size={40} style={{
                marginBottom: 20,
                color: colors.primary
              }}/></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
