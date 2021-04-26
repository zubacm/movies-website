import React, { useEffect, useState } from "react";
import "../assets/userprofile.scss";

export default function UserProfile({ user }) {
  return (
    <div className="container-card">
      <div>
        <span className="secondary-text">Name: </span>
        <span className="primary-text red-text">{user.Name}</span>
      </div>
      <div>
        <span className="secondary-text">Id: </span>
        <span className="primary-text red-text">{user.Id}</span>
      </div>
      <div className="grid-wrapper">
        <div className="one-grid">
          <div className="secondary-text">Roles: </div>
          {Array.isArray(user.Role) ? (
            user.Role.map((role) => (
              <div className="red-text list-item">{role}</div>
            ))
          ) : (
            <div className="red-text list-item">{user.Role}</div>
          )}
        </div>
        <div className="two-grid">
          <div className="secondary-text">Roles Permissions</div>
          {Array.isArray(user.RolePermission) ? (
            user.RolePermission.map((rp) => (
              <div className="red-text list-item">{rp}</div>
            ))
          ) : (
            <div className="red-text list-item">{user.RolePermission}</div>
          )}
        </div>
      </div>
    </div>
  );
}
