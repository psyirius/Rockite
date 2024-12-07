import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { PluggableList } from 'unified';
import { processHtml, htmlEncode } from './utils';
import shortcuts from './shortcuts';
import * as styles from './styles';
import './style/index.less';

export * from './SelectionText';

type Padding<T> = T | { top?: T; right?: T; bottom?: T; left?: T };

export interface EditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * ...
   */
  prefixCls?: string;
  /**
   * Support dark-mode/night-mode
   */
  themeMode?: 'dark' | 'light';
  /**
   * Set what programming language the code belongs to.
   */
  language?: string;
  /**
   * Optional padding for code. Default: `10`.
   */
  padding?: Padding<number | string>;
  /**
   * rehypePlugins (Array.<Plugin>, default: `[[rehypePrism, { ignoreMissing: true }]]`)
   * List of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins) to use. See the next section for examples on how to pass options
   */
  rehypePlugins?: PluggableList;
  /**
   * The minimum height of the editor. Default: `16`.
   */
  minHeight?: number;
  /**
   * The number of spaces for indentation when pressing tab key. Default: `2`.
   */
  indentWidth?: number;

  /// Extras
  // highlight: (value: string) => string | React.ReactNode;
  contentStyle?: React.CSSProperties;

  /// Events
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void | boolean;
}

export default React.forwardRef<HTMLTextAreaElement, EditorProps>((
  props,
  ref
) => {
  const {
    prefixCls = 'w-tc-editor',
    value: _,
    padding = 10,
    minHeight = 16,
    placeholder,
    language,
    themeMode,
    className,
    style,
    contentStyle: _contentStyle,
    rehypePlugins,
    onChange,
    indentWidth = 2,
    ...other
  } = props;

  const [value, setValue] = useState(props.value || '');
  useEffect(() => setValue(props.value || ''), [props.value]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle<HTMLTextAreaElement, HTMLTextAreaElement>(ref, () => inputRef.current!, [inputRef]);

  const contentStyle = {
    paddingTop: typeof padding === 'object' ? padding.top : padding,
    paddingRight: typeof padding === 'object' ? padding.right : padding,
    paddingBottom: typeof padding === 'object' ? padding.bottom : padding,
    paddingLeft: typeof padding === 'object' ? padding.left : padding,
    ..._contentStyle,
  };

  const htmlStr = useMemo(
    () =>
      processHtml(
        `<pre aria-hidden=true><code ${language && value ? `class="language-${language}"` : ''} >${htmlEncode(
          String(value || ''),
        )}</code><br /></pre>`,
        rehypePlugins,
      ),
    [value, language, rehypePlugins],
  );
  const preview = useMemo(
    () => (
      <div
        style={{ ...styles.editor, ...contentStyle, minHeight }}
        className={`${prefixCls}-preview ${language ? `language-${language}` : ''}`}
        dangerouslySetInnerHTML={{
          __html: htmlStr,
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefixCls, language, htmlStr],
  );

  const change = (evn: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evn.target.value);
    onChange && onChange(evn);
  };

  const keyDown = (evn: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (other.readOnly) return;
    if (!other.onKeyDown || other.onKeyDown(evn) !== false) {
      shortcuts(evn, indentWidth);
    }
  };

  const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    autoComplete: 'off',
    autoCorrect: 'off',
    spellCheck: 'false',
    autoCapitalize: 'off',
    ...other,
    placeholder,
    style: {
      ...styles.editor,
      ...styles.textarea,
      ...contentStyle,
      minHeight,
      ...(placeholder && !value ? { WebkitTextFillColor: 'inherit' } : {}),
    },
    onChange: change,
    onKeyDown: keyDown,
    className: `${prefixCls}-text`,
    value: value,
  };

  return (
    <div
      style={{ ...styles.container, ...style }}
      className={`${prefixCls} ${className || ''}`}
      data-color-mode={themeMode}
    >
      <textarea {...textareaProps} ref={inputRef} />
      {preview}
    </div>
  );
});
