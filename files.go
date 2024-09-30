package main

import (
	"os"

	"github.com/pkg/errors"
)

type VMOptions struct {
	Print bool
	Proxy bool
}

func (o *VMOptions) Write(file *os.File) error {
	content := []byte("// vm options\n")

	if o.Print {
		content = append(content, []byte("catvm.memory.config.print  = true\n")...)
	}

	if o.Proxy {
		content = append(content, []byte("catvm.memory.config.proxy  = true\n\n")...)
	}

	if _, err := file.Write(content); err != nil {
		return errors.Wrap(err, "failed to write option")
	}

	return nil
}

type Files []string

// Files implement io.Writer
func (f Files) Write(file *os.File) error {
	for _, path := range f {

		content := []byte(`// file: ` + path)
		content = append(content, '\n')
		_, err := file.Write(content)
		if err != nil {
			return errors.Wrapf(err, "failed to write file path content to file: %s", path)
		}

		path = `vm/` + path

		// read file content from embed and write to file from
		content, err = vmFiles.ReadFile(path)
		if err != nil {
			return errors.Wrapf(err, "failed to read file content from embed: %s", path)
		}
		content = append(content, '\n')

		_, err = file.Write(content)
		if err != nil {
			return errors.Wrapf(err, "failed to write file content to file: %s", path)
		}

	}

	return nil
}

var tools = Files{
	`tools/memory.js`,
	`tools/safefunction.js`,
	`tools/print.js`,
	`tools/proxy.js`,
}

var browser = Files{
	`browser/eventTarget.js`,
	`browser/windowProperties.js`,
	`browser/window.js`,
	`browser/location.js`,
	`browser/navigator.js`,
	`browser/history.js`,
	`browser/screen.js`,
	`browser/storage.js`,
	`browser/mimeType.js`,
	`browser/plugin.js`,
	`browser/pluginArray.js`,
	`browser/mimeTypeArray.js`,
	"browser/HTMLElements/htmlDivElement.js",
	`browser/document.js`,
}
