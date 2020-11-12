import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/code';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/template';
import 'tinymce/plugins/table';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/help';

import { isFunc } from '../../utils/util';

const VARIABLE_AUTO_COMPLETE = 'variables';

const addSearchVariable = (editor, variables) => {
  console.log(variables);
  editor.ui.registry.addAutocompleter(VARIABLE_AUTO_COMPLETE, {
    ch: '$', // the trigger character to open the autocompleter
    minChars: 2, // lower number means searching sooner - but more lookups as we go
    columns: 1, // must be 1 for text-based results
    fetch: function fetchVaria(pattern) {
      console.log(`Pattern ${pattern}`);
      return new tinymce.util.Promise(function promise(resolve) {
        resolve(
          variables.map(t => ({
            value: t.name,
            text: t.remark,
          })),
        );
      });
    },
    onAction(autocompleteApi, rng, value) {
      const els = `<span class="badge badge-info">${value}</span>`;

      // insert in to the editor
      editor.selection.setRng(rng);
      editor.insertContent(els);

      // hide the autocompleter
      autocompleteApi.hide();
    },
  });
};

const Editor = ({ value, onChange, onBlur, variables }) => {
  const ref = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    if (editor.current) {
      const newContent = editor.current.getContent({ format: 'html' });
      if (newContent !== value) {
        editor.current.setContent(value);
      }
    }
  }, [value]);

  const handleInit = useCallback(() => {
    const edi = editor.current;
    edi.setContent(value);
    edi.on('change keyup setcontent', () => {
      const newContent = editor.current.getContent({ format: 'html' });
      if (isFunc(onChange)) {
        onChange(newContent);
      }
    });
    addSearchVariable(edi, variables);
  }, [onChange, variables]);

  useEffect(() => {
    console.log(ref.current);
    tinymce
      .init({
        skin_url: '/static/tinymce/skins/ui/oxide',
        content_css: '/static/tinymce/skins/content/default/content.min.css',
        height: 800,
        setup: edi => {
          console.log(edi);
          editor.current = edi;
          edi.on('init', handleInit);
        },
        target: ref.current,
        plugins: `${VARIABLE_AUTO_COMPLETE} print preview paste importcss autolink directionality code visualblocks fullscreen image link media template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap`,
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap | fullscreen preview save print | imagetools image media template link code',
        importcss_append: true,
        contextmenu: 'link image imagetools table',
        toolbar_mode: 'wrap',
        image_advtab: true,
        menubar: false,
      })
      .then(editors => {
        console.log(editors);
      });
    return () => {
      console.log('Clean up');
      const edi = editor.current;
      if (edi) {
        edi.off('init', handleInit);
        if (edi.initialized) {
          edi.off('change keyup setcontent', () => {});
        }
        edi.remove();
      }
    };
  }, [variables]);
  return (
    <textarea
      ref={ref}
      onChange={onChange}
      defaultValue={value}
      onBlur={onBlur}
    />
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  variables: PropTypes.array,
};

export default Editor;
