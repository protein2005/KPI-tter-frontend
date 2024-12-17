import React from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';

function Subscribe() {
  return (
    <section className="col-md-6 mx-auto text-center card p-4 shadow-sm rounded bg-light">
      <h3 className="mb-4 d-flex justify-content-center align-items-center gap-2">
        <FaBell size={24} className="text-primary" />
        Підпишіться на оновлення
      </h3>
      <p className="text-muted mb-4">
        Будьте першими, хто дізнається про наші новини, оновлення та цікаві матеріали. Підпишіться
        зараз!
      </p>
      <form className="d-flex flex-column gap-3">
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-primary text-white">
            <FiMail size={20} />
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Введіть вашу електронну пошту"
            aria-label="Email"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary d-flex justify-content-center align-items-center gap-2 shadow-sm">
          <FiSend size={18} />
          Підписатися
        </button>
      </form>
    </section>
  );
}

export default Subscribe;
