import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Team.css";
import team1 from '../../photos/team1.webp';
import team2 from '../../photos/team2.webp';
import team3 from '../../photos/team3.webp';
import team4 from '../../photos/team4.webp';
import instagram from '../../photos/instagram.png';
import X from '../../photos/twitter.png';
import facebook from '../../photos/facebook.png';
import youtube from '../../photos/youtube.png';

function Team() {
    return (
        <section className="team-section">
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className="team-title">
                            We pride ourselves on have a<br /> team of highly skilled
                        </h2>

                        <p className="team-desc">
                            Not cool. Our tightly knitted fabric holds its form after repeated wear. Plus, Aldays dress up<br />or down, no prob. So you can wear them all day. Get it?
                        </p>

                        <Row className="team-members">
                            {/* Team 1 */}
                            <Col md={3} sm={6} className="team-member-col">
                                <div className="team-member">
                                    <div className="member-image">
                                        <img src={team1} alt="Jennifer C." className="member-photo" />
                                        <div className="social-overlay">
                                            <div className="social-icons">
                                                <img src={instagram} alt="instagram" className="social-icon" />
                                                <img src={X} alt="X" className="social-icon" />
                                                <img src={facebook} alt="facebook" className="social-icon" />
                                                <img src={youtube} alt="youtube" className="social-icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h5 className="member-name">Jennifer C.</h5>
                                        <p className="member-role">Founder, CEO</p>
                                    </div>
                                </div>
                            </Col>

                            {/* Team 2 */}
                            <Col md={3} sm={6} className="team-member-col">
                                <div className="team-member">
                                    <div className="member-image">
                                        <img src={team2} alt="Valerita Nadopta" className="member-photo" />
                                        <div className="social-overlay">
                                            <div className="social-icons">
                                                <img src={instagram} alt="instagram" className="social-icon" />
                                                <img src={X} alt="X" className="social-icon" />
                                                <img src={facebook} alt="facebook" className="social-icon" />
                                                <img src={youtube} alt="youtube" className="social-icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h5 className="member-name">Valariia Nadopta</h5>
                                        <p className="member-role">Founder, COO</p>
                                    </div>
                                </div>
                            </Col>

                            {/* Team 3 */}
                            <Col md={3} sm={6} className="team-member-col">
                                <div className="team-member">
                                    <div className="member-image">
                                        <img src={team3} alt="Valerita Nadopta" className="member-photo" />
                                        <div className="social-overlay">
                                            <div className="social-icons">
                                                <img src={instagram} alt="instagram" className="social-icon" />
                                                <img src={X} alt="X" className="social-icon" />
                                                <img src={facebook} alt="facebook" className="social-icon" />
                                                <img src={youtube} alt="youtube" className="social-icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h5 className="member-name">Valariia Nadopta</h5>
                                        <p className="member-role">Founder, COO</p>
                                    </div>
                                </div>
                            </Col>

                            {/* Team Member 4 */}
                            <Col md={3} sm={6} className="team-member-col">
                                <div className="team-member">
                                    <div className="member-image">
                                        <img src={team4} alt="Slava Fedutik" className="member-photo" />
                                        <div className="social-overlay">
                                            <div className="social-icons">
                                                <img src={instagram} alt="instagram" className="social-icon" />
                                                <img src={X} alt="X" className="social-icon" />
                                                <img src={facebook} alt="facebook" className="social-icon" />
                                                <img src={youtube} alt="youtube" className="social-icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <h5 className="member-name">Slava Fedutik</h5>
                                        <p className="member-role">Founder, Chief Creative</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Team;