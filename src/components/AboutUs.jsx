import React from 'react';
import { FaUsers, FaPenFancy, FaHeart, FaCommentDots, FaSmile } from 'react-icons/fa';

function AboutUs() {
  return (
    <section className="mb-5 text-center">
      <h3 className="mb-4">
        Про наш сайт <FaSmile className="text-warning" />
      </h3>
      <p>
        Ми створили <span className="fw-bold">KPI-tter</span>, щоб допомогти вам знаходити цікаві
        матеріали, ділитися знаннями та обговорювати їх із іншими користувачами. 🚀
      </p>

      <div className="row mt-4">
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <FaUsers size={40} className="text-primary mb-3" />
              <h5 className="card-title fw-bold">Спільнота</h5>
              <p className="card-text">
                Приєднуйтесь до нашої дружньої спільноти та знайдіть однодумців! 🤝
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <FaPenFancy size={40} className="text-success mb-3" />
              <h5 className="card-title fw-bold">Створюйте пости</h5>
              <p className="card-text">
                Діліться своїми думками, історіями та знаннями з іншими. 📝
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <FaHeart size={40} className="text-danger mb-3" />
              <h5 className="card-title fw-bold">Лайки та підтримка</h5>
              <p className="card-text">
                Підтримуйте інших користувачів, ставлячи лайки їх матеріалам! ❤️
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <FaCommentDots size={40} className="text-info mb-3" />
              <h5 className="card-title fw-bold">Коментарі</h5>
              <p className="card-text">
                Обговорюйте, ставте запитання та залишайте свої враження. 💬
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4">
        Насолоджуйтесь зручним інтерфейсом та широкими можливостями{' '}
        <FaSmile className="text-warning" />!
      </p>
    </section>
  );
}

export default AboutUs;
