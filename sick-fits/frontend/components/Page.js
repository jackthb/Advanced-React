import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children, cool }) {
  return (
    <div>
      <Header />
      <h2>I AM PAGE</h2>
      <h2>HEHE</h2>
      {children}
      {cool}
      <code>BRUH</code>
    </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  // children: PropTypes.arrayOf(PropTypes.node)
};
