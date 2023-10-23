import getPreferentColor from "../../colors/getPreferentColor";

export default function getShowPage (activeTab) {
    const colorMode = getPreferentColor();
    let tabContent;
    switch (activeTab) {
        case "avatar":
            tabContent = (
            <form className="row flex-column align-items-center">
                <div class="my-3 col-12 col-md-6">
                  <label for="avatar" class="form-label">New Avatar URL</label>
                  <input type="text" class="form-control" id="avatar"/>
                </div>
                <div class="mb-3 col-12 col-md-6">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password"/>
                </div>
                <button type="submit" className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Avatar</button>
              </form>);
            break;
        case "username":
            tabContent = (
                <form className="row flex-column align-items-center">
                    <div class="my-3 col-12 col-md-6">
                      <label for="name" class="form-label">New Name</label>
                      <input type="text" class="form-control" id="name"/>
                    </div>
                    <div class="mb-3 col-12 col-md-6">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" id="password"/>
                    </div>
                    <button type="submit" className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Name</button>
                  </form>);
            break;
        case "email":
            tabContent = (
                <form className="row flex-column align-items-center">
                    <div class="my-3 col-12 col-md-6">
                      <label for="email" class="form-label">New E-Mail</label>
                      <input type="email" class="form-control" id="email"/>
                    </div>
                    <div class="my-3 col-12 col-md-6">
                      <label for="confirmEmail" class="form-label">Confirm New E-Mail</label>
                      <input type="email" class="form-control" id="confirmEmail"/>
                    </div>
                    <div class="mb-3 col-12 col-md-6">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" id="password"/>
                    </div>
                    <button type="submit" className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Avatar</button>
                  </form>);
            break;
        case "password":
            tabContent = (
                <form className="row flex-column align-items-center">
                    <div class="my-3 col-12 col-md-6">
                      <label for="newPassword" class="form-label">New Password</label>
                      <input type="email" class="form-control" id="newPassword"/>
                    </div>
                    <div class="my-3 col-12 col-md-6">
                      <label for="confirmPassword" class="form-label">Confirm New Password</label>
                      <input type="email" class="form-control" id="confirmPassword"/>
                    </div>
                    <div class="mb-3 col-12 col-md-6">
                      <label for="password" class="form-label">Actual Password</label>
                      <input type="password" class="form-control" id="password"/>
                    </div>
                    <button type="submit" className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Avatar</button>
                  </form>);
            break;
        default:
            tabContent = <div>Change your User here</div>;
    }
    return tabContent;
}