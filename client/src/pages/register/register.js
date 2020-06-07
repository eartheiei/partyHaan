import React, { Component } from "react";
import { login, register } from "../../components/UserFunctions";
import "./register.css";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      massage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    register(user).then((res) => {
      if (res.status === 200) {
        login(user).then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            this.props.history.push(`/dashborad`);
          }
        });
      } else {
        this.setState({
          message: res.data,
        });
      }
    });
  }

  render() {
    const { message } = this.state;
    return (
      <section class="hero is-fullheight background">
        <div class="hero-body main">
          <div>
            <div className="center" style={{ marginBottom: "3rem" }}>
              <label className="title is-3">สร้างบัญชีผู้ใช้</label>
            </div>
            <div
              className="box columns"
              style={{ backgroundColor: "#E7E7E7", minWidth: "30vw" }}
            >
              <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
                <div className="filed">
                  <label className="label">ชื่อผู้ใช้งาน</label>
                  <div className="control">
                    <input
                      className="input-text"
                      type="email"
                      name="email"
                      placeholder="อีเมล"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="filed">
                  <label className="label">รหัสผ่าน</label>
                  <div className="control">
                    <input
                      className="input-text"
                      type="password"
                      name="password"
                      placeholder="รหัสผ่าน"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                {message !== "" && (
                  <p
                    className="label help is-danger"
                    style={{ bottom: "43.5%", position: "absolute" }}
                  >
                    {message}
                  </p>
                )}
                <div className="rows chackbox-group">
                  <div style={{ display: "flex" }}>
                    <input className="checkbox" type="checkbox" required />
                    <label className="label">
                      ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน PartyHaan
                      รวมถึงนโยบายความเป็นส่วนตัว
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <input className="checkbox" type="checkbox" required />
                    <label className="label">
                      ฉันต้องการรับข่าวสารเกี่ยวกับโปรโมชั่นจาก PartyHaan
                    </label>
                  </div>
                </div>
                <div
                  className="field is-grouped"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="control" style={{ marginTop: "1rem" }}>
                    <button
                      className="button"
                      type="submit"
                      style={{ width: "auto" }}
                    >
                      เข้าสู่ระบบ
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
