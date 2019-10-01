const signUpHtml = `
                             <div class="form-grid">
                                <div>
                                    <div class="input-label">
                                        <label for="firstName">First Name</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="text" placeholder="Joël" name="firstName" required>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="lastName">Last Name</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="text" placeholder="Atiamutu" name="lastName" required>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="gender">Gender</label>
                                    </div>
                                    <div class="input-area gender-grid">
                                        <div>
                                            <label for="male">Male</label>
                                            <input type="radio" id="male" name="gender" value="male" checked required>
                                        </div>
                                        <div>
                                            <label for="female">Female</label>
                                            <input type="radio" id="female" name="gender" value="female" required>
                                        </div>
                                        <div>
                                            <label for="other">Other</label>
                                            <input type="radio" id="other" name="gender" value="other" required>
                                    
                                        </div>
                                    
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="email">Email</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="email" placeholder="joelatiam@googlemail.com" name="email" required>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="password">Password</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="password" placeholder="*******" name="password" required>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="confirmPass">Confirm Password</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="password" placeholder="*******" name="confirmPass" required>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="department">Department</label>
                                    </div>
                                    <div class="input-area">
                                    
                                        <select id="department" name="department">
                                            <option  value="" >--Choose your department--</option>
                            
                                        </select>
                                    
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="jobRole">Job Role</label>
                                    </div>
                                    <div class="input-area">
                                        <select id="jobRole" name="jobRole">
                                            <option value="" disabled>--First Choose your Department--</option>
                                            
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <div class="input-label">
                                    <label for="address">Address</label>
                                </div>
                                <div class="input-area">
                                    <input type="text" placeholder="12 Av. du Palmier Makiso Kisangani DRC" name="address" class="address-input"
                                        required>
                                </div>
                            </div>
                            <div>
                                <div class="signButton">
                                <button class="signupButton">Signup</button>
                            </div>
                            </div>
                            <div>
                                <div class="sign-footer">
                                    <p>If you have an account, please signin</p>
                                </div>
                            </div>

`;

const signInHtml = `
                       
                            <div class="form-grid">


                                <div>
                                    <div class="input-label">
                                        <label for="email">Email</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="email" placeholder="joelatiam@googlemail.com" name="email"
                                            required>
                                    </div>
                                </div>
                                <div>
                                    <div class="input-label">
                                        <label for="password">Password</label>
                                    </div>
                                    <div class="input-area">
                                        <input type="password" placeholder="*******" name="password" required>
                                    </div>
                                </div>




                            </div>

                            <div>
                                <div class="signButton">
                                    <button class="signinButton">Signin</button>
                                </div>
                            <div>
                                <div class="sign-footer">
                                    <p>If you don't have an account, please signup</p>
                                </div>
                            </div>
`;
