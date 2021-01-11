﻿using System;
using System.Collections.Generic;

namespace RNAqbase.Models
{
	public class Helix : BaseEntity
	{
		public string Id { get; set; }
		public string Id_updated { get; set; }
		public string PdbIdentifier { get; set; }
		public int PdbId { get; set; }
		public int AssemblyId { get; set; }
        public string PdbDeposition { get; set; }
        public string Molecule { get; set; }
		public string Sequence { get; set; }
		public string NumberOfStrands { get; set; }
		public int NumberOfTetrads { get; set; }
		public int NumberOfQudaruplexes { get; set; }
		public string Visualization2D { get; set; }
		public byte[] Visualization3D { get; set; }
		public string Experiment { get; set; }
		public List<int> Tetrads { get; set; }
        public List<int> Quadruplexes { get; set; }
		public string ArcDiagram { get; set; }
	}
}
