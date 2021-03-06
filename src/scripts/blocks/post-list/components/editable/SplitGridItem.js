const { __ } = wp.i18n;
const { RichText, URLInputButton, MediaUpload } = wp.editor;
const { IconButton } = wp.components;

const setURL = (image) => {
  if (!image.sizes || !Object.prototype.hasOwnProperty.call(image.sizes, 'large')) {
    return image.url;
  }

  return image.sizes.large.url;
};

const SplitGridItem = props => (
  <article className="splitGrid-item" style={ {
    backgroundImage: `url(${props.featured_image})`,
  } }>
    <span className="splitGrid-itemMeta">
      <RichText
        tagName="div"
        onChange={ props.createUpdate('tagText') }
        value={ props.tagText }
        placeholder={ __('(Insert Tag)', 'benenson') }
        keepPlaceholderOnFocus={ true }
        formattingControls={ [] }
        format="string"
      />
      <URLInputButton
        url={ props.tagLink }
        onChange={ props.createUpdate('tagLink') }
      />
    </span>
    <h3 className="splitGrid-itemTitle">
      <a>
        <RichText
          tagName="div"
          onChange={ props.createUpdate('title') }
          value={ props.title }
          placeholder={ __('(Insert Title)', 'benenson') }
          keepPlaceholderOnFocus={ true }
          formattingControls={ [] }
          format="string"
        />
        <URLInputButton
          url={ props.titleLink }
          onChange={ props.createUpdate('titleLink') }
        />
      </a>
    </h3>
    <div className="splitGrid-itemContent">
      <RichText
        tagName="p"
        onChange={ props.createUpdate('excerpt') }
        value={ props.excerpt }
        placeholder={ __('(Insert Content)', 'benenson') }
        keepPlaceholderOnFocus={ true }
        formattingControls={ [] }
        format="string"
      />
    </div>
    <div className="linkList-options">
      {
        props.featured_image_id &&
        props.featured_image_id !== -1 &&
        <IconButton icon="no-alt" onClick={ () => props.updateMedia({
          featured_image_id: '',
          featured_image: '',
        }) }>
          { __('Remove Image', 'benenson') }
        </IconButton>
      }
      <MediaUpload
        onSelect={ media => props.updateMedia({
          featured_image_id: media.id,
          featured_image: setURL(media),
        }) }
        value={ props.featured_image_id }
        allowedTypes={ ['image'] }
        render={ ({ open }) => (
        <IconButton icon="format-image" onClick={ open } />
        ) }
      />
      <IconButton onClick={ props.createRemove } icon="trash" />
    </div>
  </article>
);

export default SplitGridItem;
