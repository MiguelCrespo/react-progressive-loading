import React from 'react';

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
      console.log('childComponent: ', this.refs.childComponent);

      window.addEventListener('scroll', this.checkViewport);
      console.log('Element: ', this.element);
      this.element.onload = () => {
        console.log('Image loaded');
      };

      this.element.onerror = () => {
        console.log('Image error');
      };

      setTimeout(function () {
        this.checkViewport();
      }.bind(this), 2000);
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
        console.log('Is in viewport');
        this.isLoading = true;
        this.setState({
          actualSrc: this.props.src
        });
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