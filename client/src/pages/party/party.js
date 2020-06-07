import React, { Component } from "react";
import { createParty } from "../../components/PartyFunction";
import jwt_decode from "jwt-decode";

export default class Party extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      limit: "",
      uid: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoeded = jwt_decode(token);
    this.setState({
      uid: decoeded.uid,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const party = {
      name: this.state.name,
      limit: this.state.limit,
      uid: this.state.uid,
    };

    createParty(party).then((res) => this.props.history.push(`/dashborad`));
  }

  render() {
    return (
      <section class="hero is-fullheight background">
        <div class="hero-body main">
          <div>
            <div className="center" style={{ marginBottom: "3rem" }}>
              <label className="title is-3">สร้างปาร์ตี้</label>
            </div>
            <div className="columns" style={{ minWidth: "30vw" }}>
              <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
                <div className="filed">
                  <label className="label">ชื่อปาร์ตี้</label>
                  <div className="control">
                    <input
                      className="input-text"
                      type="text"
                      name="name"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="filed">
                  <label className="label">จำนวนคนที่ขาด</label>
                  <div className="control">
                    <input
                      className="input-text"
                      type="number"
                      name="limit"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div
                  className="field is-grouped"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="control" style={{ marginTop: "3rem" }}>
                    <button className="button" type="submit">
                      สร้างปาร์ตี้
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
