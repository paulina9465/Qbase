﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using RNAqbase.Models;

namespace RNAqbase.Services
{
	public interface IHelixService
	{
		Task<List<HelicesWithoutVisualizations>> GetAllHelices();
		Task<Helix> GetHelixById(int id);
        Task<HelixReference> GetHelixReferenceById(int id);
        Task<MemoryStream> GetHelix3dVisualization(int id);

    }
}
