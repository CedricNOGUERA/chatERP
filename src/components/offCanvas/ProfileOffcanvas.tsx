import React from 'react'
import useAuthStore from '../../store/userAuthStore'

const ProfileOffcanvas = ({meData}: any) => {

  const authLogout = useAuthStore((state: any) => state.authLogout)

  return (
    <div
      className="offcanvas offcanvas-end border-0"
      tabIndex={-1}
      id="userProfileCanvasExample"
    >
      <div className="offcanvas-body profile-offcanvas p-0">
        <div className="team-cover">
          <img
            src={meData?.avatar}
            // src="assets/images/small/img-9.jpg"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="p-1 pb-4 pt-0">
          <div className="team-settings">
            <div className="row g-0">
              <div className="col">
                <div className="btn nav-btn">
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="col-auto">
                <div className="user-chat-nav d-flex">
                  <button
                    type="button"
                    className="btn nav-btn favourite-btn active"
                  >
                    <i className="ri-star-fill"></i>
                  </button>

                  <div className="dropdown">
                    <a
                      className="btn nav-btn"
                      href="/"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="/archive">
                          <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>
                          Archive
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/muted">
                          <i className="ri-mic-off-line align-bottom text-muted me-2"></i>
                          Muted
                        </a>
                      </li>
                      <li onClick={authLogout}>
                        <a className="dropdown-item" href="/">
                          <i className="ri-logout-box-r-line align-bottom text-muted me-2"></i>
                          Log out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 text-center">
          <img
            // src="assets/images/users/avatar-2.jpg"
            src={meData?.avatar}
            alt=""
            className="avatar-lg img-thumbnail rounded-circle mx-auto profile-img"
          />
          <div className="mt-3">
            <h5 className="fs-16 mb-1">
              <a href="/lisa_parker" className="link-primary username">
                {meData?.first_name} {meData?.last_name}
              </a>
            </h5>
            <p className="text-muted">
              <i className="ri-checkbox-blank-circle-fill me-1 align-bottom text-success"></i>
              Online
            </p>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <button
              type="button"
              className="btn avatar-xs p-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Message"
            >
              <span className="avatar-title rounded bg-light text-body">
                <i className="ri-question-answer-line"></i>
              </span>
            </button>

            <button
              type="button"
              className="btn avatar-xs p-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Favourite"
            >
              <span className="avatar-title rounded bg-light text-body">
                <i className="ri-star-line"></i>
              </span>
            </button>

            <button
              type="button"
              className="btn avatar-xs p-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Phone"
            >
              <span className="avatar-title rounded bg-light text-body">
                <i className="ri-phone-line"></i>
              </span>
            </button>

            <div className="dropdown">
              <button
                className="btn avatar-xs p-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="avatar-title bg-light text-body rounded">
                  <i className="ri-more-fill"></i>
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/">
                    <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>
                    Archive
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    <i className="ri-mic-off-line align-bottom text-muted me-2"></i>
                    Muted
                  </a>
                </li>
                <li onClick={authLogout}>
                  <a className="dropdown-item" href="/">
                    <i className="ri-logout-box-r-line align-bottom text-muted me-2"></i>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-top border-top-dashed p-3">
          <h5 className="fs-16 mb-3">Personal Details</h5>
          <div className="mb-3">
            <p className="text-muted text-uppercase fw-semibold fs-13 mb-1">
              Number
            </p>
            <h6>+(256) 2451 8974</h6>
          </div>
          <div className="mb-3">
            <p className="text-muted text-uppercase fw-semibold fs-13 mb-1">
              Email
            </p>
            <h6>lisaparker@gmail.com</h6>
          </div>
          <div>
            <p className="text-muted text-uppercase fw-semibold fs-13 mb-1">
              Location
            </p>
            <h6 className="mb-0">California, USA</h6>
          </div>
        </div>

        <div className="border-top border-top-dashed p-3">
          <h5 className="fs-16 mb-3">Attached Files</h5>

          <div className="vstack gap-2">
            <div className="border rounded border-dashed p-2">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-xs">
                    <div className="avatar-title bg-light text-secondary rounded fs-20">
                      <i className="ri-folder-zip-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="fs-15 mb-1">
                    <a href="#" className="text-body text-truncate d-block">
                      App pages.zip
                    </a>
                  </h5>
                  <div className="text-muted">2.2MB</div>
                </div>
                <div className="flex-shrink-0 ms-2">
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-icon text-muted btn-sm fs-18"
                    >
                      <i className="ri-download-2-line"></i>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ri-more-fill"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-share-line align-bottom me-2 text-muted"></i>{" "}
                            Share
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-bookmark-line align-bottom me-2 text-muted"></i>{" "}
                            Bookmark
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-delete-bin-line align-bottom me-2 text-muted"></i>{" "}
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded border-dashed p-2">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-xs">
                    <div className="avatar-title bg-light text-secondary rounded fs-20">
                      <i className="ri-file-ppt-2-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="fs-15 mb-1">
                    <a href="#" className="text-body text-truncate d-block">
                      Velzon admin.ppt
                    </a>
                  </h5>
                  <div className="text-muted">2.4MB</div>
                </div>
                <div className="flex-shrink-0 ms-2">
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-icon text-muted btn-sm fs-18"
                    >
                      <i className="ri-download-2-line"></i>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ri-more-fill"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-share-line align-bottom me-2 text-muted"></i>{" "}
                            Share
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-bookmark-line align-bottom me-2 text-muted"></i>{" "}
                            Bookmark
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-delete-bin-line align-bottom me-2 text-muted"></i>{" "}
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded border-dashed p-2">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-xs">
                    <div className="avatar-title bg-light text-secondary rounded fs-20">
                      <i className="ri-folder-zip-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="fs-15 mb-1">
                    <a href="#" className="text-body text-truncate d-block">
                      Images.zip
                    </a>
                  </h5>
                  <div className="text-muted">1.2MB</div>
                </div>
                <div className="flex-shrink-0 ms-2">
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-icon text-muted btn-sm fs-18"
                    >
                      <i className="ri-download-2-line"></i>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ri-more-fill"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-share-line align-bottom me-2 text-muted"></i>{" "}
                            Share
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-bookmark-line align-bottom me-2 text-muted"></i>{" "}
                            Bookmark
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-delete-bin-line align-bottom me-2 text-muted"></i>{" "}
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded border-dashed p-2">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-xs">
                    <div className="avatar-title bg-light text-secondary rounded fs-20">
                      <i className="ri-image-2-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="fs-15 mb-1">
                    <a href="#" className="text-body text-truncate d-block">
                      bg-pattern.png
                    </a>
                  </h5>
                  <div className="text-muted">1.1MB</div>
                </div>
                <div className="flex-shrink-0 ms-2">
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-icon text-muted btn-sm fs-18"
                    >
                      <i className="ri-download-2-line"></i>
                    </button>
                    <div className="dropdown">
                      <button
                        className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ri-more-fill"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-share-line align-bottom me-2 text-muted"></i>{" "}
                            Share
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-bookmark-line align-bottom me-2 text-muted"></i>{" "}
                            Bookmark
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="ri-delete-bin-line align-bottom me-2 text-muted"></i>{" "}
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-2">
              <button type="button" className="btn btn-danger">
                Load more{" "}
                <i className="ri-arrow-right-fill align-bottom ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOffcanvas