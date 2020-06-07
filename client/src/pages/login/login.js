import React, { Component } from "react";
import { login } from "../../components/UserFunctions";
import "./login.css";

export default class Login extends Component {
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

    login(user).then((res) => {
      if (res.status === 200) {
        this.props.history.push(`/dashborad`);
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
              <label className="title is-3">เข้าสู่ระบบ</label>
            </div>
            <div
              className="box columns"
              style={{ backgroundColor: "#E7E7E7", minWidth: "30vw" }}
            >
              <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
                <div className="filed">
                  <label className="label">อีเมล</label>
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
                    style={{ bottom:'45.5%', position: "absolute" }}
                  >
                    {message}
                  </p>
                )}
                <div
                  className="field is-grouped"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="control" style={{ marginTop: "2rem" }}>
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
            <div className="center" style={{ marginTop: "4rem" }}>
              <button
                className="button"
                style={{ fontSize: "1.2rem" }}
                onClick={() => this.props.history.push(`/register`)}
              >
                สร้างบัญชีผู้ใช้
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
