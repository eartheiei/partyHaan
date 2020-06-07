import React, { Component } from "react";
import {
  allParty,
  countMember,
  joinParty,
} from "../../components/PartyFunction";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./dashborad.css";

export default class Dashborad extends Component {
  constructor() {
    super();
    this.state = {
      parties: [],
      uid: 0,
      burger: false,
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoeded = jwt_decode(token);
    this.setState({
      uid: decoeded.uid,
    });

    allParty().then(async (parties) => {
      let data = parties;
      let result = [];
      await Promise.all(
        parties.map(async (party, index) => {
          let res = await countMember(party.pid);
          let count;
          res.map((element) => {
            if (element.userId === decoeded.uid) {
              count = {
                count: res.length,
                joined: true,
              };
            } else {
              count = {
                count: res.length,
                joined: false,
              };
            }
          });

          const mix = Object.assign(data[index], count);
          result.push(mix);
        })
      );
      this.setState({
        parties: result,
      });
    });
  }

  memberJoin(partyId, uid) {
    const detail = {
      partyId: partyId,
      userId: uid,
    };
    console.log(detail);
    joinParty(detail).then((res) => window.location.reload());
  }

  logout(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
  }

  render() {
    const { parties, uid, burger } = this.state;
    return (
      <div>
        <div class="headbar">
          <div>
            <label class="label">ปาร์ตี้ทั้งหมด</label>
          </div>
          <div class="nav-menu">
            <NavLink class="nav-item" to="/party">
              <label class="label">สร้างปาร์ตี้</label>
            </NavLink>
            <NavLink class="nav-item" to="/login" onClick={() => this.logout}>
              <label class="label">ออกจากระบบ</label>
            </NavLink>
          </div>
          <div class="burger-menu" onClick={()=> this.setState({burger:true})}>
            <div class="burger"></div>
            <div class="burger"></div>
            <div class="burger"></div>
          </div>
          <div class="nav-menu-mobile" style={{ display: burger? "flex":"none" }}>
            <NavLink class="nav-item" to="/party">
              <label class="label">สร้างปาร์ตี้</label>
            </NavLink>
            <NavLink class="nav-item" to="/login" onClick={() => this.logout}>
              <label class="label">ออกจากระบบ</label>
            </NavLink>
          </div>
        </div>
        <div class="party" onClick={()=> this.setState({burger:false})}>
          {parties.map((party) => (
            <div class="card">
              <div class="card-image">
                <img
                  class="img"
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </div>
              <div class="card-content">
                <div class="content">
                  <div class="party-name">
                    <label class="label">{party.name}</label>
                  </div>
                  <div class="party-limit">
                    <label>
                      จำนวน {party.count}/{party.limit}
                    </label>
                  </div>
                  <div class="party-join">
                    {party.count === party.limit && !party.joined && (
                      <label class="label full">ปาร์ตี้เต็มแล้ว</label>
                    )}
                    {party.joined && (
                      <label class="label joined">เข้าร่วมแล้ว</label>
                    )}
                    {!party.joined && party.count !== party.limit && (
                      <button
                        class="button"
                        style={{ width: "auto" }}
                        onClick={() => this.memberJoin(party.pid, uid)}
                      >
                        เข้าร่วมปาร์ตี้
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
