{ pkgs }: {
	deps = [
   pkgs.python39Packages.ray
		pkgs.nodejs-18_x
		pkgs.nodePackages.typescript-language-server
		pkgs.yarn
		pkgs.replitPackages.jest
	];
}