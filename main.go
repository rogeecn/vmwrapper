package main

import (
	"embed"
	"os"

	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

//go:embed vm/*
var vmFiles embed.FS

var vmOptions *VMOptions

func init() {
	vmOptions = &VMOptions{}
}

func main() {
	rootCmd := &cobra.Command{
		Use:     "vmwrapper",
		Example: `vmwrapper [source] [output]`,
		RunE:    generate,
	}

	rootCmd.PersistentFlags().BoolVarP(&vmOptions.Print, "print", "p", true, "enable print")
	rootCmd.PersistentFlags().BoolVarP(&vmOptions.Proxy, "proxy", "x", true, "enable proxy")

	if err := rootCmd.Execute(); err != nil {
		logrus.Fatal(err)
	}
}

func generate(cmd *cobra.Command, args []string) error {
	if len(args) != 2 {
		return errors.New("invalid arguments")
	}

	source := args[0]
	output := args[1]

	outputFile, err := os.OpenFile(output, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o644)
	if err != nil {
		return errors.Wrapf(err, "failed to open output file: %s", output)
	}
	defer outputFile.Close()

	// write file
	if err := tools.Write(outputFile); err != nil {
		return errors.Wrap(err, "tools: failed to write file")
	}

	if err := vmOptions.Write(outputFile); err != nil {
		return errors.Wrap(err, "vmOptions: failed to write file")
	}

	if err := browser.Write(outputFile); err != nil {
		return errors.Wrap(err, "browser: failed to write file")
	}

	sourceContent, err := os.ReadFile(source)
	if err != nil {
		return errors.Wrapf(err, "failed to read source file: %s", source)
	}

	if _, err := outputFile.Write(sourceContent); err != nil {
		return errors.Wrap(err, "failed to write source file")
	}

	return nil
}
