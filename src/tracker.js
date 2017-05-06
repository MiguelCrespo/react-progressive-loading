import React, { PropTypes } from 'react';
import _ from './styles.css';

export default function connect(WrappedComponent) {
  return class extends React.Component {
    state = {
      actualSrc: this.props.placeholderSrc,
      isLoaded: false
    }
    
    static defaultProps = {
      offset: 0
    }

    constructor(props) {
      super(props);

      this.checkViewport = this.checkViewport.bind(this);
      this.trackElement = this.trackElement.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.checkViewport);
      this.element.onload = () => {
        if (this.state.actualSrc === this.props.src) {
          this.setState({
            isLoaded: true
          });
        }
      };

      this.element.onerror = () => {
        console.error('Image error');
      };

      this.checkViewport();
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.checkViewport);
    }

    isInViewport() {
      const rect = this.element.getBoundingClientRect();
      const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
      const viewportWidth = (window.innerWidth || document.documentElement.clientWidth);

      return (
        rect.bottom >= (0 - this.props.offset) &&
        rect.right >= (0 - this.props.offset) &&
        rect.top < (viewportHeight + this.props.offset) &&
        rect.left < (viewportWidth + this.props.offset)
      );
    }

    checkViewport() {
      if (this.isInViewport() && !this.isLoading) {
        this.isLoading = true;
        this.setState({
          actualSrc: this.props.src
        });

        window.removeEventListener('scroll', this.checkViewport);
      }

      return null;
    }

    trackElement(element) {
      this.element = element;
    }

    render() {
      return <WrappedComponent ref='childComponent' {...this.props} data={this.state} trackElement={this.trackElement} />;
    }
  };
}