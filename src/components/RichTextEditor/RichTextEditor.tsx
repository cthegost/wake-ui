import React, { useEffect, useCallback, useRef } from 'react';
import { EditorProvider, FloatingMenu, BubbleMenu, useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
// Импортируем иконки из react-icons
import { 
  FiBold, FiItalic, FiUnderline, FiMinus, 
  FiList, FiCheckSquare, FiChevronsLeft, 
  FiAlignLeft, FiAlignCenter, FiAlignRight, 
  FiImage, FiRotateCcw, FiRotateCw 
} from 'react-icons/fi';
import './RichTextEditor.css';

export interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  renderCustomControls?: (editor: Editor) => React.ReactNode;
}

// Расширенная панель инструментов
const MenuBar: React.FC<{ editor: Editor | null; renderCustomControls?: (editor: Editor) => React.ReactNode }> = ({ editor, renderCustomControls }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/') || !editor) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src === 'string') {
        editor.chain().focus().setImage({ src }).run();
      }
    };
    reader.readAsDataURL(file);

    if (event.target) {
      event.target.value = '';
    }
  }, [editor]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Используем импортированные иконки
  const icons = {
    bold: <FiBold />,
    italic: <FiItalic />,
    strike: <FiMinus />, // FiUnderline не совсем подходит, FiMinus как зачеркивание
    h1: <span>H1</span>, 
    h2: <span>H2</span>,
    h3: <span>H3</span>,
    bulletList: <FiList />,
    orderedList: <FiCheckSquare />, // Пример, можно найти более подходящую, FiList с цифрами
    blockquote: <FiChevronsLeft />, // Пример, можно найти кавычки
    alignLeft: <FiAlignLeft />,
    alignCenter: <FiAlignCenter />,
    alignRight: <FiAlignRight />,
    image: <FiImage />,
    undo: <FiRotateCcw />,
    redo: <FiRotateCw />,
  };

  return (
    <div className="rte-menubar">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept="image/*"
      />
      
      <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''} aria-label="Bold">{icons.bold}</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''} aria-label="Italic">{icons.italic}</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''} aria-label="Strike">{icons.strike}</button>
      
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} aria-label="Heading 1">{icons.h1}</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} aria-label="Heading 2">{icons.h2}</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} aria-label="Heading 3">{icons.h3}</button>
      
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''} aria-label="Bullet List">{icons.bulletList}</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''} aria-label="Ordered List">{icons.orderedList}</button>

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''} aria-label="Blockquote">{icons.blockquote}</button>
      
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} aria-label="Align Left">{icons.alignLeft}</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} aria-label="Align Center">{icons.alignCenter}</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''} aria-label="Align Right">{icons.alignRight}</button>

      <button onClick={triggerFileInput} aria-label="Add Image">{icons.image}</button>

      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} aria-label="Undo">{icons.undo}</button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} aria-label="Redo">{icons.redo}</button>

      {renderCustomControls && renderCustomControls(editor)}
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  onChange,
  editable = true,
  placeholder = 'Введите текст...',
  className,
  style,
  renderCustomControls,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Blockquote,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
          inline: false,
          allowBase64: true,
      }),
      Dropcursor,
    ],
    content: initialContent,
    editable: editable,
    editorProps: {
      attributes: {
        class: 'rte-content', 
      },
      handlePaste: (view, event, slice) => {
          if (event.clipboardData && event.clipboardData.files && event.clipboardData.files.length) {
              const file = event.clipboardData.files[0];
              if (file.type.startsWith('image/')) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                      const src = e.target?.result;
                      if (typeof src === 'string') {
                          view.dispatch(
                              view.state.tr.replaceSelectionWith(view.state.schema.nodes.image.create({ src }))
                          );
                      }
                  };
                  reader.readAsDataURL(file);
                  return true;
              }
          }
          return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML()); 
    },
  });

  useEffect(() => {
    if (editor && placeholder) {
        const isEmpty = editor.state.doc.textContent.length === 0 && editor.state.doc.childCount <= 1 && editor.state.doc.firstChild?.isTextblock && editor.state.doc.firstChild?.content.size === 0;
        editor.view.dom.setAttribute('data-placeholder', isEmpty ? placeholder : '');
    }
}, [editor, placeholder, editor?.state]);


  const combinedClassName = ['rte-container', className].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName} style={style}>
      {editable && <MenuBar editor={editor} renderCustomControls={renderCustomControls} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor; 